export const String2PhaseNumber = (phase: string) => {
  const phaseMap = new Map<string, number>();
  phaseMap.set("Strategy", 1);
  phaseMap.set("Content", 2);
  phaseMap.set("Publishing", 3);
  phaseMap.set("Review", 4);

  phaseMap.set("Design", 1);
  phaseMap.set("Development", 2);
  phaseMap.set("Testing", 3);
  phaseMap.set("Launch", 4);

  return phaseMap.get("phase") || 0;
};
