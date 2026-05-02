export const insightsData = [
  {
    id: 1,
    title: "The Future of Real Estate in Post-Pandemic India",
    category: "Market Trends",
    date: "Mar 15, 2025",
    image: "/images/Market-trends.jpeg",
    excerpt: "How the pandemic has changed the real estate landscape in India and what to expect in the coming years.",
    content: `
      The real estate landscape in India has undergone a massive transformation in the wake of the pandemic. With remote work becoming a permanent fixture for many organizations, the demand for larger, more flexible homes has surged. Buyers are prioritizing properties with dedicated office spaces, robust internet connectivity, and access to wellness amenities.
      
      Furthermore, the commercial real estate sector is adapting to hybrid work models. We are seeing a shift towards flexible workspaces and suburban office hubs, reducing the reliance on central business districts. Developers are increasingly incorporating sustainable and touchless technologies to ensure safety and hygiene.
      
      Looking ahead, the integration of PropTech, such as virtual tours and digital transactions, will continue to streamline the buying and selling process, making the market more resilient and accessible to global investors.
    `
  },
  {
    id: 2,
    title: "Top 10 Emerging Localities for Investment in 2025",
    category: "Investment",
    date: "Feb 28, 2025",
    image: "/images/investment22.jpeg",
    excerpt: "Discover the up-and-coming areas across India that promise high returns on real estate investments.",
    content: `
      Identifying the right locality is crucial for maximizing real estate investment returns. In 2025, the focus is shifting from saturated tier-1 city centers to peripheral areas and tier-2 cities that offer immense growth potential.
      
      Key emerging localities include the outer rings of Bangalore, which are benefiting from new metro extensions and IT park developments. In Pune, areas like Hinjewadi and Wakad continue to attract young professionals, driving up rental yields. Similarly, the upcoming infrastructure projects around Noida International Airport are making nearby sectors highly attractive for long-term capital appreciation.
      
      Investors should also keep an eye on smart city initiatives in cities like Ahmedabad and Indore, where government spending is rapidly improving urban infrastructure and connectivity.
    `
  },
  {
    id: 3,
    title: "Sustainable Construction: The New Norm in Indian Real Estate",
    category: "Trends",
    date: "Jan 20, 2025",
    image: "/images/insight-3.jpeg",
    excerpt: "How eco-friendly practices are shaping the future of construction in India.",
    content: `
      Sustainability is no longer just a buzzword; it's a fundamental requirement in modern Indian real estate. With growing awareness of climate change and environmental impact, both developers and buyers are shifting their focus towards eco-friendly construction practices.
      
      Green buildings, characterized by energy-efficient designs, rainwater harvesting systems, and solar power integration, are seeing a significant premium in the market. Developers are also utilizing sustainable materials, such as fly-ash bricks and recycled steel, to reduce their carbon footprint.
      
      Additionally, government incentives for IGBC (Indian Green Building Council) certified projects are accelerating this transition. As we move forward, sustainable homes will not only benefit the environment but also offer long-term cost savings for residents through reduced energy and water consumption.
    `
  },
  {
    id: 4,
    title: "Understanding REITs: A Modern Investment Avenue",
    category: "Investment",
    date: "Jan 5, 2025",
    image: "/images/insight4.jpeg",
    excerpt: "A comprehensive guide to Real Estate Investment Trusts and their growing popularity in India.",
    content: `
      Real Estate Investment Trusts (REITs) have emerged as a game-changer for retail investors in India. REITs allow individuals to invest in large-scale, income-generating real estate assets—such as commercial office parks, malls, and warehouses—without having to buy or manage the physical properties themselves.
      
      The primary advantage of REITs is liquidity. Unlike physical real estate, which can take months to sell, REIT units are traded on stock exchanges, making them easily accessible. Moreover, REITs are mandated to distribute a significant portion of their rental income as dividends to shareholders, providing a steady stream of passive income.
      
      As the Indian commercial real estate sector continues to mature, REITs offer a transparent and regulated pathway for investors to diversify their portfolios and gain exposure to high-value assets.
    `
  }
];

export const getInsightById = (id) => {
  return insightsData.find(insight => insight.id === Number(id));
};

export const getAllInsights = () => {
  return insightsData;
};
