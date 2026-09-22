//#region node_modules/.nitro/vite/services/ssr/assets/recipes-L-YJySwQ.js
var DAYS = [
	{
		key: "mon",
		label: "Monday"
	},
	{
		key: "tue",
		label: "Tuesday"
	},
	{
		key: "wed",
		label: "Wednesday"
	},
	{
		key: "thu",
		label: "Thursday"
	}
];
var SECTION_ORDER = [
	"Produce",
	"Meat & Seafood",
	"Dairy",
	"Bulk",
	"Grocery aisles",
	"Frozen"
];
var DEFAULT_WEEK = [
	"turkey-skillet",
	"greek-chicken",
	"shrimp-stirfry",
	"sheet-salmon"
];
var RECIPES = [
	{
		id: "turkey-skillet",
		title: "Mexican turkey skillet",
		cuisine: "Mexican",
		protein: "turkey",
		minutes: 20,
		calories: 480,
		servings: 2,
		image: "/recipes/turkey-skillet.jpg",
		summary: "One pan: 93% turkey, peppers, black beans, salsa. Rice + avocado on the side.",
		ingredients: [
			"1 lb 93% ground turkey",
			"1 yellow onion, chopped",
			"1 bell pepper, chopped",
			"1 can Sprouts black beans, drained",
			"1 tsp cumin",
			"1 tsp chili powder",
			"½ cup salsa",
			"Microwave jasmine rice",
			"1 avocado, sliced",
			"Cilantro"
		],
		steps: [
			"Brown turkey in a skillet with onion and bell pepper, 8–10 min.",
			"Stir in beans, cumin, chili powder, salt, and salsa. Simmer 3 min.",
			"Heat rice pouch. Plate with avocado and cilantro."
		]
	},
	{
		id: "greek-chicken",
		title: "Greek chicken thighs + cucumber salad",
		cuisine: "Mediterranean",
		protein: "chicken",
		minutes: 25,
		calories: 520,
		servings: 2,
		image: "/recipes/greek-chicken.jpg",
		summary: "Oregano-garlic thighs, pan or sheet. Cold cucumber-tomato-feta salad.",
		ingredients: [
			"1 lb boneless skinless chicken thighs",
			"Olive oil, oregano, garlic, salt, pepper",
			"2 cucumbers",
			"2 tomatoes or 1 pint cherry",
			"½ small red onion, thin",
			"4 oz feta",
			"Lemon"
		],
		steps: [
			"Toss thighs with oil, oregano, garlic, salt, pepper.",
			"Sear or roast at 425°F until 165°F, about 18–20 min.",
			"Chop cucumber, tomato, onion. Dress with oil, lemon, feta."
		]
	},
	{
		id: "shrimp-stirfry",
		title: "Garlic-ginger shrimp stir-fry",
		cuisine: "East Asian",
		protein: "shrimp",
		minutes: 20,
		calories: 430,
		servings: 2,
		image: "/recipes/shrimp-stirfry.jpg",
		summary: "Hot pan, EZ-peel shrimp, broccoli, soy. Rice pouch.",
		ingredients: [
			"1 lb large EZ-peel shrimp",
			"1 head broccoli or bag florets",
			"1 bell pepper",
			"Garlic + fresh ginger",
			"Soy sauce",
			"1 tsp fish sauce (optional)",
			"Jasmine rice pouch"
		],
		steps: [
			"Peel shrimp if needed. Heat skillet until almost smoking.",
			"Garlic and ginger 30 sec, then shrimp 2 min.",
			"Add broccoli and pepper. Splash soy and fish sauce. Serve over rice."
		]
	},
	{
		id: "sheet-salmon",
		title: "Sheet-pan salmon + corn + potatoes",
		cuisine: "American",
		protein: "salmon",
		minutes: 25,
		calories: 560,
		servings: 2,
		image: "/recipes/sheet-salmon.jpg",
		summary: "Potatoes first, then salmon and corn. Lemon and parsley to finish.",
		ingredients: [
			"2 Atlantic salmon fillets (~6 oz each)",
			"1.5–2 lb small red/gold potatoes, halved",
			"2 ears sweet corn (or frozen kernels)",
			"Olive oil, salt, pepper",
			"Lemon + parsley"
		],
		steps: [
			"Heat oven to 425°F. Toss potatoes with oil and salt. Roast 10 min.",
			"Add salmon and corn. Roast 12–14 min more.",
			"Finish with lemon and parsley."
		]
	},
	{
		id: "turkey-wraps",
		title: "Turkey lettuce wraps",
		cuisine: "East Asian",
		protein: "turkey",
		minutes: 20,
		calories: 430,
		servings: 2,
		image: "/recipes/turkey-wraps.jpg",
		summary: "Ginger turkey in butter lettuce. Soy, lime, cilantro. No rice needed.",
		ingredients: [
			"1 lb 93% ground turkey",
			"1 head butter lettuce",
			"Garlic + fresh ginger",
			"Soy sauce",
			"Lime",
			"Cilantro"
		],
		steps: [
			"Brown turkey with garlic and ginger, 8 min.",
			"Splash soy. Spoon into lettuce cups.",
			"Finish with lime and cilantro."
		]
	},
	{
		id: "shrimp-tacos",
		title: "Shrimp tacos + slaw",
		cuisine: "Mexican",
		protein: "shrimp",
		minutes: 20,
		calories: 490,
		servings: 2,
		image: "/recipes/shrimp-tacos.jpg",
		summary: "Chili shrimp, cabbage, avocado, lime. Corn tortillas.",
		ingredients: [
			"1 lb large EZ-peel shrimp",
			"Chili powder, salt",
			"¼ head cabbage, shredded",
			"1 avocado",
			"Lime",
			"Cilantro",
			"6 corn tortillas"
		],
		steps: [
			"Pat shrimp dry, toss with chili and salt. Sear 2 min per side.",
			"Warm tortillas. Pile shrimp, cabbage, avocado.",
			"Lime and cilantro."
		]
	},
	{
		id: "chicken-beans",
		title: "Chicken + white bean skillet",
		cuisine: "Italian",
		protein: "chicken",
		minutes: 25,
		calories: 510,
		servings: 2,
		image: "/recipes/chicken-beans.jpg",
		summary: "Thighs, cannellini, cherry tomatoes, rosemary. One pan.",
		ingredients: [
			"1 lb boneless skinless chicken thighs",
			"1 can Sprouts cannellini beans, drained",
			"1 pint cherry tomatoes",
			"Garlic + rosemary",
			"Olive oil, salt, pepper"
		],
		steps: [
			"Sear thighs 5 min per side. Rest on a plate.",
			"Tomatoes and garlic in the pan 3 min. Add beans.",
			"Return chicken, rosemary, 5 min more."
		]
	},
	{
		id: "salmon-bowl",
		title: "Salmon rice bowl",
		cuisine: "Japanese",
		protein: "salmon",
		minutes: 20,
		calories: 540,
		servings: 2,
		image: "/recipes/salmon-bowl.jpg",
		summary: "Seared salmon over jasmine rice, cucumber, avocado, soy.",
		ingredients: [
			"2 Atlantic salmon fillets (~6 oz each)",
			"Jasmine rice pouch",
			"1 cucumber",
			"1 avocado",
			"Soy sauce",
			"Sesame seeds if you have them"
		],
		steps: [
			"Heat rice. Sear salmon skin-side down 4 min, flip 3 min.",
			"Slice cucumber and avocado.",
			"Bowl: rice, salmon, veg, soy."
		]
	}
];
var GROCERY = [
	{
		id: "onion-y",
		name: "1 yellow onion",
		section: "Produce",
		recipeIds: ["turkey-skillet"]
	},
	{
		id: "onion-r",
		name: "1 small red onion",
		section: "Produce",
		recipeIds: ["greek-chicken"]
	},
	{
		id: "peppers",
		name: "2 bell peppers",
		section: "Produce",
		recipeIds: ["turkey-skillet", "shrimp-stirfry"]
	},
	{
		id: "broccoli",
		name: "1 head broccoli or bag florets",
		section: "Produce",
		recipeIds: ["shrimp-stirfry"]
	},
	{
		id: "cukes",
		name: "cucumbers (2 if Greek, 1 if bowl)",
		section: "Produce",
		recipeIds: ["greek-chicken", "salmon-bowl"]
	},
	{
		id: "toms",
		name: "2 tomatoes or 1 pint cherry",
		section: "Produce",
		recipeIds: ["greek-chicken", "chicken-beans"]
	},
	{
		id: "avo",
		name: "avocado (1–2; bagged BOGO 50%)",
		section: "Produce",
		recipeIds: [
			"turkey-skillet",
			"shrimp-tacos",
			"salmon-bowl"
		]
	},
	{
		id: "citrus",
		name: "lemons/limes (2–3)",
		section: "Produce",
		recipeIds: [
			"greek-chicken",
			"sheet-salmon",
			"turkey-wraps",
			"shrimp-tacos"
		]
	},
	{
		id: "herbs",
		name: "cilantro or parsley",
		section: "Produce",
		recipeIds: [
			"turkey-skillet",
			"sheet-salmon",
			"turkey-wraps",
			"shrimp-tacos"
		]
	},
	{
		id: "ginger",
		name: "small piece fresh ginger",
		section: "Produce",
		recipeIds: ["shrimp-stirfry", "turkey-wraps"]
	},
	{
		id: "corn",
		name: "2 ears sweet corn (5 for $2)",
		section: "Produce",
		recipeIds: ["sheet-salmon"]
	},
	{
		id: "pots",
		name: "1.5–2 lb small red/gold potatoes",
		section: "Produce",
		recipeIds: ["sheet-salmon"]
	},
	{
		id: "garlic",
		name: "garlic (2–3 cloves or jar)",
		section: "Produce",
		recipeIds: [
			"greek-chicken",
			"shrimp-stirfry",
			"turkey-wraps",
			"chicken-beans"
		]
	},
	{
		id: "lettuce",
		name: "1 head butter lettuce",
		section: "Produce",
		recipeIds: ["turkey-wraps"]
	},
	{
		id: "cabbage",
		name: "¼ head cabbage",
		section: "Produce",
		recipeIds: ["shrimp-tacos"]
	},
	{
		id: "rosemary",
		name: "fresh rosemary (or dried)",
		section: "Produce",
		recipeIds: ["chicken-beans"]
	},
	{
		id: "turkey",
		name: "1 lb Old Tyme 93% ground turkey",
		section: "Meat & Seafood",
		recipeIds: ["turkey-skillet", "turkey-wraps"]
	},
	{
		id: "thighs",
		name: "1 lb boneless skinless chicken thighs",
		section: "Meat & Seafood",
		recipeIds: ["greek-chicken", "chicken-beans"]
	},
	{
		id: "shrimp",
		name: "1 lb large EZ-peel shrimp",
		section: "Meat & Seafood",
		recipeIds: ["shrimp-stirfry", "shrimp-tacos"]
	},
	{
		id: "salmon",
		name: "2 Atlantic salmon fillets (~6 oz each)",
		section: "Meat & Seafood",
		recipeIds: ["sheet-salmon", "salmon-bowl"]
	},
	{
		id: "feta",
		name: "4 oz feta",
		section: "Dairy",
		recipeIds: ["greek-chicken"]
	},
	{
		id: "rice",
		name: "jasmine rice (bulk) or microwave pouches",
		section: "Bulk",
		recipeIds: [
			"turkey-skillet",
			"shrimp-stirfry",
			"salmon-bowl"
		]
	},
	{
		id: "beans",
		name: "Sprouts black beans, 15 oz",
		section: "Grocery aisles",
		recipeIds: ["turkey-skillet"]
	},
	{
		id: "whitebeans",
		name: "Sprouts cannellini beans, 15 oz",
		section: "Grocery aisles",
		recipeIds: ["chicken-beans"]
	},
	{
		id: "soy",
		name: "soy sauce",
		section: "Grocery aisles",
		recipeIds: [
			"shrimp-stirfry",
			"turkey-wraps",
			"salmon-bowl"
		]
	},
	{
		id: "fish",
		name: "fish sauce if on the shelf (skip if not)",
		section: "Grocery aisles",
		recipeIds: ["shrimp-stirfry"]
	},
	{
		id: "salsa",
		name: "salsa 12–16 oz",
		section: "Grocery aisles",
		recipeIds: ["turkey-skillet"]
	},
	{
		id: "oil",
		name: "olive oil if you’re out",
		section: "Grocery aisles",
		recipeIds: [
			"greek-chicken",
			"sheet-salmon",
			"chicken-beans"
		]
	},
	{
		id: "tortillas",
		name: "corn tortillas (small pack)",
		section: "Grocery aisles",
		recipeIds: ["shrimp-tacos"]
	},
	{
		id: "chili",
		name: "chili powder if you’re out",
		section: "Grocery aisles",
		recipeIds: ["turkey-skillet", "shrimp-tacos"]
	},
	{
		id: "frozencorn",
		name: "frozen corn — only if fresh is gone",
		section: "Frozen",
		recipeIds: ["sheet-salmon"],
		note: "optional"
	}
];
function recipeById(id) {
	return RECIPES.find((r) => r.id === id);
}
function groceryForWeek(weekIds) {
	const set = new Set(weekIds);
	return GROCERY.filter((g) => g.recipeIds.some((id) => set.has(id)));
}
//#endregion
export { SECTION_ORDER as a, RECIPES as i, DEFAULT_WEEK as n, groceryForWeek as o, GROCERY as r, recipeById as s, DAYS as t };
