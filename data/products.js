const dateOptions = { year: "numeric", month: "long", day: "numeric" };
const products = [
  {
    productName: "tree-runners",
    colors: [
      {
        colorId: "mist",
        colorName: "Mist (White Sole)",
        media: [
          "../Images/products/tree-runners/mist1.avif",
          "../Images/products/tree-runners/mist2.avif",
          "../Images/products/tree-runners/mist3.avif",
        ],
      },
      {
        colorId: "buoyant-blue",
        colorName: "Buoyant Blue (Blizzard Sole)",
        media: [
          "../Images/products/tree-runners/buoyant-blue1.avif",
          "../Images/products/tree-runners/buoyant-blue2.avif",
          "../Images/products/tree-runners/buoyant-blue3.avif",
        ],
      },
      {
        colorId: "wasatch",
        colorName: "Wasatch (White Sole)",
        media: [
          "../Images/products/tree-runners/wasatch1.avif",
          "../Images/products/tree-runners/wasatch2.avif",
          "../Images/products/tree-runners/wasatch3.avif",
        ],
      },
    ],
    reviews: [
      {
        rating: 1,
        title: "Too soft",
        text: "They are too weak, too soft and not what I was expecting. Might be good for the beach or as indoor slippers. They are not fit for walking on a street.",
        author: "Philip",
        date: new Date().toLocaleDateString("en-US", dateOptions),
      },
      {
        rating: 5,
        title: "Very Good For Holidays",
        text: "I like to travel light - no hold luggage, so these little beauties were perfect for my onboard case - nice and light you see. They are also very fashionable and attracted quite a few envious looks whilst out at night in our swanky hotel...",
        author: "Peter",
        date: new Date().toLocaleDateString("en-US", dateOptions),
      },
      {
        rating: 1,
        title: "New shoeeees",
        text: "Love them",
        author: "Andrew",
        date: new Date().toLocaleDateString("en-US", dateOptions),
      },
      {
        rating: 5,
        title: "Excellent product",
        text: "Excellent product",
        author: "Yulian",
        date: new Date().toLocaleDateString("en-US", dateOptions),
      },
    ],
  },
];

export default products;
