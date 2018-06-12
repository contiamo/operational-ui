/**
 * Return the initials in 2 letters from a full name.
 *
 * @param name
 */
export const getInitials = (name: string): string => {
  if (!name) return ""
  const fullInitials = name
    .split(" ")
    .map(([firstLetter]) => firstLetter.toUpperCase())
    .join("")

  const [firstInitial, , lastInitial] = fullInitials
  return fullInitials.length > 2 ? firstInitial + lastInitial : fullInitials
}
