export interface Item {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/**
 * Adds a delay to simulate slower network conditions
 * @param ms - Milliseconds to delay
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches items from JSONPlaceholder API - a fake REST API for testing and prototyping
 * @param limit - Optional limit for number of items to fetch (default: 10)
 * @param simulateDelay - Optional delay in milliseconds to simulate slow network (default: 1500ms)
 * @returns Promise<Item[]> - Array of items
 */
export async function getItems(limit: number = 10, simulateDelay: number = 1500): Promise<Item[]> {
  try {
    // Add artificial delay to simulate slow network
    await delay(simulateDelay);
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const items: Item[] = await response.json();
    return items;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw error;
  }
}

/**
 * Fetches a single item by ID
 * @param id - The ID of the item to fetch
 * @param simulateDelay - Optional delay in milliseconds to simulate slow network (default: 1000ms)
 * @returns Promise<Item> - Single item
 */
export async function getItemById(id: number, simulateDelay: number = 1000): Promise<Item> {
  try {
    // Add artificial delay to simulate slow network
    await delay(simulateDelay);
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const item: Item = await response.json();
    return item;
  } catch (error) {
    console.error(`Failed to fetch item with ID ${id}:`, error);
    throw error;
  }
}