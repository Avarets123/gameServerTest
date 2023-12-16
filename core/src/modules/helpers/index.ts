export const getUserKey = (tournament: string, nickname: string) =>
  `tournament:${tournament}_user:${nickname}`
