//Images
import visaMasterCard from "../../assets/images/visa-mastercard.png";
import ninjaVan from "../../assets/images/ninja-van.png";

export const dataFooters = [
  {
    title: "Customer Services",
    mediaSize: {
      md: 2.8,
      xs: 6,
    },
    contents: [
      {
        title: "Help Centre",
      },
      { title: "How to buy" },
      { title: "How to sell" },
      { title: "Payment Methods" },
      { title: "Return &  Refund" },
      { title: "Contact Us" },
      { title: "Terms & Services" },
    ],
  },
  {
    title: "About SMART APES",
    mediaSize: {
      md: 2.8,
      xs: 6,
    },
    contents: [
      { title: "About Us" },
      { title: "SMART APES Career" },
      { title: "SMART APES Policies", link: "/privacy-policy" },
    ],
  },
  // {
  //   title: "Follow Us",
  //   contentWithImages: [
  //     {
  //       title: "Smart Apes",
  //       image: iconFacebook,
  //     },
  //     {
  //       title: "smartapes.official",
  //       image: iconInstagram,
  //     },
  //     {
  //       title: "smartapes.official",
  //       image: iconLinkedIn,
  //     },
  //   ],
  // },
  {
    twoColumns: true,
    mediaSize: {
      md: 2.6,
      xs: 6,
    },
    contentWithImages: [
      {
        title: "Payments",
        contentImages: [
          {
            title: "visa master card",
            image: visaMasterCard,
          },
        ],
      },
      {
        title: "Logistics",
        contentImages: [
          {
            title: "ninjaVan",
            image: ninjaVan,
          },
        ],
      },
    ],
  },
  // {
  //   title: "Visit",
  //   contents: [
  //     "Smart Apes Singapore",
  //     "Smart Apes Indonesia",
  //     "Smart Apes Thailand",
  //     "Smart Apes Malaysia",
  //     "Smart Apes Vietnam",
  //     "Smart Apes Philippines",
  //   ],
  // },
];
