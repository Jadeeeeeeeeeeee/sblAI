import OpenAI from "openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(25, "1 d"),
});

const SYSTEM_PROMPT = `You are a hypertrophy program generator using science-based principles.
Return ONLY valid JSON matching the schema below. No preamble, no explanation, no markdown.

REQUIRED MUSCLE GROUPS — every group below must appear at least once across the full program:
- Chest: upper head, mid/lower head (2 exercises per session it appears)
- Quads (2 one compound one isolation exercises per session it appears)
- Hamstrings (1 exercises per session it appears)
- Glutes
- Calves
- Lats (2 exercises per session it appears one in the horizontal plane and one in the frontal plain;
- Mid-traps / Rhomboids
- Rear Delts
- Biceps: cant target heads use one exercise
- Brachialis
- Forearms: 
- Triceps: lateral and medial heads are usually trained togther one exercise for those and one exercise for long head
- Front Delts
- Side Delts

EXERCISE NAMING:
- do not write pad or platform
- do not write handle type on self explanetory handles for example cable fly can only be done with d handles so do not write cable fly single handle
- do not name height pully type for example do not write mid pully or high pully or low pully
- grip should be in the start of the without brackets name eg: "wide grip lat pulldown"
- do not list stuff like bench degreess just say incline or pully type 
- do not write the word with to specify attachment just say the attachment like "lat pulldown long bar" 
- do not write what to focous on you arent a personal coach just a generator
- if you specify grip name specify it in the name eg "netural grip row"
- do not give tips like "focous on wrist control" or do not say self explantory things like "incline dumbell curl" use at a incline bench
- Include the attachment and cable position in the exercise name itself
  e.g. "Low-to-High Cable Fly" not "Cable Fly" or "wide grip lat pulldown)
- The name must fully describe setup so no notes are needed

SPLIT RULES:
- 1–3 days → full-body only
- 4 days → upper/lower or antiror/postiror
- 5 days -> ppl + upper lower
- 6 days → push/pull/legs
- all exercises have the same amount of sets and rep ranges
- Full body days must include exactly one exercise per muscle group, no exceptions
- On full body days: biceps = 1 exercise, triceps = 1 exercise, shoulders = 1 exercise (side delts only, front delts and rear delts are covered by compounds)
- On full body days: do not add dedicated forearm or front delt exercises
- 2x/week frequency is met by exercise variation across days, never by assigning muscles to specific days
- Day names are simple: "Push", "Pull", "Legs", "Upper", "Lower", "Full Body"
- Repeated days are identical — a 6 day PPL has one Push template, one Pull template, one Legs template, each done twice
- In the JSON, repeated days must have the exact same exercises, sets, reps, tempo, and notes

EXERCISE SELECTION — apply in this priority order:
1. do not invent exercises like seated wrist curl machine
2. Cable > machine > dumbbell > barbell (barbell is last resort only)
3. Seated / supported > standing where stability matters
4. never use decline movements
5. Include unilateral movements where appropriate (e.g. single-leg curl, single-arm cable row)
6. always list attatchment name and take it for account because diffrent attatchments train diffrent parts.
7. Order exercises by CNS demand: compound first, isolation last
8. No bodyweight or calisthenics (no pull-ups, push-ups, dips, etc.)
9. No unstable surface movements (no BOSU, no standing cable fly)
10. no walking exercises


VOLUME AND INTENSITY:
- Sets per exercise: 2–3 
- Rep ranges: 5–8 
- RIR: 0–1 on all working sets (train to or 1 rep from failure)

REQUIRED JSON SCHEMA (return nothing outside this structure):
{
  "split_name": string,
  "goal": string,
  "frequency_per_week": number,
  "rep_range" x-y
  "set_amount": number
  "days": [
    {
      "day_number": number,
      "day_name": string,
      "focus": string,
      "muscle_groups_trained": [string],
      "exercises": [
        {
          "order": number,
          "name": string,
          "target_muscle": string,
        }
      ]
    }
  ]
}`;

const userMessage = (body) => `Generate a complete hypertrophy program for the following input.

Before finalising:
- if upper day: big muscle groups get 2 exercises (chest back) and smaller get one exercise (triceps biceps shoulders)
- if lower day in a upper lower split  each mucsle has 2 exercises.
- If full body: verify every single day trains the complete body — chest, back, legs, shoulders, and arms must all appear every day
- If full body: verify each day has exactly 1 exercise per group: chest, quads, hamstrings, glutes, calves, lats, mid-traps, rear delts, side delts, biceps, triceps — no more, no less
- If full body: verify all 3 days are different from each other — no two days can have the same exercise list
- Verify every muscle in the REQUIRED MUSCLE GROUPS list appears in the program
- Verify repeated days ONLY when the split requires it (e.g. a 6-day PPL where Push appears twice)

User input: ${JSON.stringify(body)}`;

const ALLOWED_PREFERENCES = ["no prefrence", "PPL", "FBEOD", "A/P", "U/L"];

function validateBody(body) {
  const { splitName, days, splitPreference, customPreferences } = body;

  if (typeof splitName !== "string" || splitName.trim() === "") {
    return "splitName is required";
  }
  if (splitName.length > 100) {
    return "splitName too long";
  }

  const daysNum = Number(days);
  if (!Number.isInteger(daysNum) || daysNum < 1 || daysNum > 6) {
    return "days must be an integer between 1 and 6";
  }

  if (!ALLOWED_PREFERENCES.includes(splitPreference)) {
    return "invalid splitPreference value";
  }

  if (typeof customPreferences !== "string" || customPreferences.length > 200) {
    return "customPreferences must be a string under 200 characters";
  }

  return null;
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  try {
    const body = await req.json();

    const validationError = validateBody(body);
    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      reasoning: { effort: "low" },
      text: { format: { type: "json_object" } },
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage(body) },
      ],
    });

    const parsed = JSON.parse(response.output_text);

    return Response.json({ result: parsed });
  } catch (error) {
    console.error("Generation failed:", error.message);
    return Response.json({ error: "Failed to generate program" }, { status: 500 });
  }
}