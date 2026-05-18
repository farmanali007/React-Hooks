/**
 * Creates a large list of fake users for filter/sort/search demos.
 * Like a restaurant menu with 500 dishes — filtering it every time
 * someone adjusts the salt shaker would be wasteful.
 */

const FIRST_NAMES = [
  'Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery',
]
const LAST_NAMES = [
  'Smith', 'Lee', 'Patel', 'Garcia', 'Kim', 'Brown', 'Nguyen', 'Wilson',
]
const CITIES = [
  'New York', 'London', 'Tokyo', 'Berlin', 'Sydney', 'Toronto', 'Paris', 'Mumbai',
]
const DEPARTMENTS = ['Engineering', 'Design', 'Sales', 'Support', 'Marketing']

/**
 * @param {number} count - How many items to generate
 * @returns {Array<{ id: number, name: string, city: string, department: string, score: number }>}
 */
export function generateUsers(count = 500) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 3) % LAST_NAMES.length]}`,
    city: CITIES[i % CITIES.length],
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    score: Math.floor(Math.random() * 100),
  }))
}
