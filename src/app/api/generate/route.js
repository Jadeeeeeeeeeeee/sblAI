import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a hypertrophy program generator using science-based principles.
Return ONLY valid JSON matching the schema below. No preamble, no explanation, no markdown.

REQUIRED MUSCLE GROUPS — every group below must appear at least once across the full program:
- Chest: upper head, mid/lower head (2 exercises per session it appears)
- Quads (2 exercises per session it appears)
- Hamstrings (2 exercises per session it appears)
- Glutes
- Calves
- Lats (2 exercises per session it appears)
- Mid-traps / Rhomboids
- Rear Delts
- Biceps: long head, short head (one exercise each)
- Brachialis
- Forearms
- Triceps: long head, lateral head, medial head (one exercise each)
- Front Delts
- Side Delts

EXERCISE NAMING:
- DO NOT write high pull or low pull or any pully type
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
- 5–6 days → push/pull/legs
- all exercises have the same amount of sets and rep ranges
- If full body: verify total exercises do not exceed 8 and no muscle group has more than 1 exercise 
- Every muscle group must be trained at least 2x per week
- Big muscles (chest, quads, hamstrings, lats): always 2 exercises on days they are trained unless full body
- Day names are simple: "Push", "Pull", "Legs", "Upper", "Lower", "Full Body"
- Repeated days are identical — a 6 day PPL has one Push template, one Pull template, one Legs template, each done twice
- In the JSON, repeated days must have the exact same exercises, sets, reps, tempo, and notes

EXERCISE SELECTION — apply in this priority order:
1. Cable > machine > dumbbell > barbell (barbell is last resort only)
2. Seated / supported > standing where stability matters
3. Include unilateral movements where appropriate (e.g. single-leg curl, single-arm cable row)
4. always list attatchment name and take it for account because diffrent attatchments train diffrent parts.
5. Order exercises by CNS demand: compound first, isolation last
6. No bodyweight or calisthenics (no pull-ups, push-ups, dips, etc.)
7. No unstable surface movements (no BOSU, no standing cable fly)
8. no walking exercises

VOLUME AND INTENSITY:
- Sets per exercise: 2–3 
- Rep ranges: 5–8 
- RIR: 0–1 on all working sets (train to or 1 rep from failure)
- Tempo format: "eccentric-pause-concentric-pause" e.g. "3-1-1-0"

REQUIRED JSON SCHEMA (return nothing outside this structure):
{
  "split_name": string,
  "goal": string,
  "frequency_per_week": number,
  "rep_range " x-y
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
          "rir": number,
          "tempo": string,
          "notes": string
        }
      ]
    }
  ]
}`;

const userMessage = (body) => `Generate a complete hypertrophy program for the following input.

Before finalising:
- If full body: verify each day has exactly 6 exercises and muscles are distributed across days, not repeated every day
- Verify every muscle in the REQUIRED MUSCLE GROUPS list appears in the program
- Verify repeated days (e.g. both Push days) have identical exercises, sets, reps, and tempo
- Verify big muscles have 2 exercises on every day they are trained
- Verify all tricep heads, shoulder heads, and bicep heads are each covered

User input: ${JSON.stringify(body)}`;
export async function POST(req) {

  try {
    // const body = await req.json();

    // const response = await client.responses.create({
    //   model: "gpt-5-mini",
    //   reasoning: { effort: "low" },
    //   text: { format: { type: "json_object" } },
    //   input: [
    //     { role: "system", content: SYSTEM_PROMPT },
    //     { role: "user", content: userMessage(body) },
    //   ],
    // });

    // const parsed = JSON.parse(response.output_text);

    // return Response.json({ result: parsed });
    return new Response(JSON.stringify({
    "result": {
        "split_name": "ppl",
        "goal": "hypertrophy",
        "frequency_per_week": 6,
        "rep_range ": "5-8",
        "set_amount": 3,
        "days": [
            {
                "day_number": 1,
                "day_name": "Push",
                "focus": "Chest, Shoulders, Triceps",
                "muscle_groups_trained": [
                    "Chest (upper head)",
                    "Chest (mid/lower head)",
                    "Front Delts",
                    "Side Delts",
                    "Triceps (long head)",
                    "Triceps (lateral head)",
                    "Triceps (medial head)",
                    "Calves",
                    "Forearms",
                    "Glutes"
                ],
                "exercises": [
                    {
                        "order": 1,
                        "name": "seated incline cable chest press high cable dual handle",
                        "target_muscle": "Chest (upper head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 2,
                        "name": "seated decline cable chest press low cable dual handle",
                        "target_muscle": "Chest (mid/lower head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 3,
                        "name": "seated cable shoulder press low cable dual handle",
                        "target_muscle": "Front Delts",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 4,
                        "name": "seated cable lateral raise low cable single handle",
                        "target_muscle": "Side Delts",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 5,
                        "name": "seated overhead cable triceps extension high cable rope",
                        "target_muscle": "Triceps (long head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 6,
                        "name": "high cable triceps pushdown straight bar",
                        "target_muscle": "Triceps (lateral head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 7,
                        "name": "high cable reverse grip triceps pushdown straight bar",
                        "target_muscle": "Triceps (medial head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 8,
                        "name": "seated cable wrist curl low cable straight bar",
                        "target_muscle": "Forearms",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 9,
                        "name": "seated cable glute press low cable ankle strap single leg",
                        "target_muscle": "Glutes",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    }
                ]
            },
            {
                "day_number": 2,
                "day_name": "Pull",
                "focus": "Lats, Mid-traps/Rhomboids, Rear Delts, Biceps",
                "muscle_groups_trained": [
                    "Lats",
                    "Lats",
                    "Mid-traps / Rhomboids",
                    "Rear Delts",
                    "Biceps (long head)",
                    "Biceps (short head)",
                    "Brachialis",
                    "Forearms"
                ],
                "exercises": [
                    {
                        "order": 1,
                        "name": "wide grip lat pulldown long bar",
                        "target_muscle": "Lats",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 2,
                        "name": "seated neutral grip single-arm cable row short handle",
                        "target_muscle": "Lats",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 3,
                        "name": "seated cable row v-bar mid handle",
                        "target_muscle": "Mid-traps / Rhomboids",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 4,
                        "name": "seated reverse pec deck machine rear delt",
                        "target_muscle": "Rear Delts",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 5,
                        "name": "incline bench cable curl low cable single handle",
                        "target_muscle": "Biceps (long head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 6,
                        "name": "seated cable concentration curl low cable short handle",
                        "target_muscle": "Biceps (short head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 7,
                        "name": "seated cable hammer curl low cable rope",
                        "target_muscle": "Brachialis",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 8,
                        "name": "seated cable wrist curl low cable straight bar",
                        "target_muscle": "Forearms",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    }
                ]
            },
            {
                "day_number": 3,
                "day_name": "Legs",
                "focus": "Quads, Hamstrings, Glutes, Calves",
                "muscle_groups_trained": [
                    "Quads",
                    "Quads",
                    "Hamstrings",
                    "Hamstrings",
                    "Glutes",
                    "Calves"
                ],
                "exercises": [
                    {
                        "order": 1,
                        "name": "seated machine leg press dual handle",
                        "target_muscle": "Quads",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 2,
                        "name": "seated single-leg extension machine",
                        "target_muscle": "Quads",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 3,
                        "name": "seated single-leg hamstring curl machine",
                        "target_muscle": "Hamstrings",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 4,
                        "name": "lying machine hamstring curl",
                        "target_muscle": "Hamstrings",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 5,
                        "name": "seated cable glute press low cable ankle strap single leg",
                        "target_muscle": "Glutes",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 6,
                        "name": "seated calf raise machine",
                        "target_muscle": "Calves",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    }
                ]
            },
            {
                "day_number": 4,
                "day_name": "Push",
                "focus": "Chest, Shoulders, Triceps",
                "muscle_groups_trained": [
                    "Chest (upper head)",
                    "Chest (mid/lower head)",
                    "Front Delts",
                    "Side Delts",
                    "Triceps (long head)",
                    "Triceps (lateral head)",
                    "Triceps (medial head)",
                    "Calves",
                    "Forearms",
                    "Glutes"
                ],
                "exercises": [
                    {
                        "order": 1,
                        "name": "seated incline cable chest press high cable dual handle",
                        "target_muscle": "Chest (upper head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 2,
                        "name": "seated decline cable chest press low cable dual handle",
                        "target_muscle": "Chest (mid/lower head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 3,
                        "name": "seated cable shoulder press low cable dual handle",
                        "target_muscle": "Front Delts",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 4,
                        "name": "seated cable lateral raise low cable single handle",
                        "target_muscle": "Side Delts",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 5,
                        "name": "seated overhead cable triceps extension high cable rope",
                        "target_muscle": "Triceps (long head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 6,
                        "name": "high cable triceps pushdown straight bar",
                        "target_muscle": "Triceps (lateral head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 7,
                        "name": "high cable reverse grip triceps pushdown straight bar",
                        "target_muscle": "Triceps (medial head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 8,
                        "name": "seated cable wrist curl low cable straight bar",
                        "target_muscle": "Forearms",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 9,
                        "name": "seated cable glute press low cable ankle strap single leg",
                        "target_muscle": "Glutes",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    }
                ]
            },
            {
                "day_number": 5,
                "day_name": "Pull",
                "focus": "Lats, Mid-traps/Rhomboids, Rear Delts, Biceps",
                "muscle_groups_trained": [
                    "Lats",
                    "Lats",
                    "Mid-traps / Rhomboids",
                    "Rear Delts",
                    "Biceps (long head)",
                    "Biceps (short head)",
                    "Brachialis",
                    "Forearms"
                ],
                "exercises": [
                    {
                        "order": 1,
                        "name": "wide grip lat pulldown long bar",
                        "target_muscle": "Lats",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 2,
                        "name": "seated neutral grip single-arm cable row short handle",
                        "target_muscle": "Lats",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 3,
                        "name": "seated cable row v-bar mid handle",
                        "target_muscle": "Mid-traps / Rhomboids",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 4,
                        "name": "seated reverse pec deck machine rear delt",
                        "target_muscle": "Rear Delts",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 5,
                        "name": "incline bench cable curl low cable single handle",
                        "target_muscle": "Biceps (long head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 6,
                        "name": "seated cable concentration curl low cable short handle",
                        "target_muscle": "Biceps (short head)",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 7,
                        "name": "seated cable hammer curl low cable rope",
                        "target_muscle": "Brachialis",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 8,
                        "name": "seated cable wrist curl low cable straight bar",
                        "target_muscle": "Forearms",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    }
                ]
            },
            {
                "day_number": 6,
                "day_name": "Legs",
                "focus": "Quads, Hamstrings, Glutes, Calves",
                "muscle_groups_trained": [
                    "Quads",
                    "Quads",
                    "Hamstrings",
                    "Hamstrings",
                    "Glutes",
                    "Calves"
                ],
                "exercises": [
                    {
                        "order": 1,
                        "name": "seated machine leg press dual handle",
                        "target_muscle": "Quads",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 2,
                        "name": "seated single-leg extension machine",
                        "target_muscle": "Quads",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 3,
                        "name": "seated single-leg hamstring curl machine",
                        "target_muscle": "Hamstrings",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 4,
                        "name": "lying machine hamstring curl",
                        "target_muscle": "Hamstrings",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 5,
                        "name": "seated cable glute press low cable ankle strap single leg",
                        "target_muscle": "Glutes",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    },
                    {
                        "order": 6,
                        "name": "seated calf raise machine",
                        "target_muscle": "Calves",
                        "rir": 1,
                        "tempo": "3-1-1-0",
                        "notes": ""
                    }
                ]
            }
        ]
    }
}))
  } catch (error) {
    console.error(error);
    console.log(error);
    return Response.json({ error: "Failed to generate program" }, { status: 500 });
  }
}