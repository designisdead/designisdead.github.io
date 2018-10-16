/*
  ^ - Only match at the beginning of the string
  http - Match the literal string "http"
  s? - Optionally match an "s"
  : - Match a colon
  \/\/ - Escape the "/" characters since they mark the beginning/end of the regular expression
  The "i" after the regular expression makes it case-insensitive so it will match "HTTP://", etc.
 */
export default function (string) {
  return /^https?:\/\//i.test(string);
}
