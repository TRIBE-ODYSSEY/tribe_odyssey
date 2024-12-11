const StatsSection = () => {
  const stats = [
    { id: 1, value: "30K+", label: "Community Members" },
    { id: 2, value: "9.4K", label: "Total NFTs" },
    { id: 3, value: "3.2K", label: "Unique Holders" },
    { id: 4, value: "1.25K", label: "Trading Volume (ETH)" },
  ];

  return (
    <div>
      <div>
        <h2>Statistics</h2>
        <div>
          {stats.map((stat) => (
            <div key={stat.id}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
