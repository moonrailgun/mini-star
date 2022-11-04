const isRollupVersionAtLeast = (
  version: string,
  major: number,
  minor: number
) => {
  if (!version) return true;
  const [currentMajor, currentMinor] = version.split('.').map(Number);
  return (
    currentMajor > major || (currentMajor === major && currentMinor >= minor)
  );
};

export const supportsInput = (version: string) =>
  isRollupVersionAtLeast(version, 0, 48);

export const supportsCodeSplitting = (version: string) =>
  isRollupVersionAtLeast(version, 1, 0);
