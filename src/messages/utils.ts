import { faker } from "@faker-js/faker";

faker.seed(123);
export interface Message {
  id: number;
  title: string;
  body: string;
  image?: string;
  bgColor: string;
}

const generated: Message[] = [];
export function toggleBg(index: number) {
  return index % 2 ? "#f5f5f5" : "white";
}
export function message(index = 0): Message {
  return {
    id: index + 1,
    bgColor: toggleBg(index),
    title: faker.lorem.sentence(),
    body: index % 2 ? faker.lorem.lines(10) : faker.lorem.sentence(),
    image: faker.image.food(640, 480, true),
  };
}
export const getMessage = (index: number) => {
  if (!generated[index]) {
    generated[index] = message(index);
  }

  return generated[index];
};
export function generateMessages(length: number, startIndex = 0) {
  return Array.from({ length }).map((_, i) => getMessage(i + startIndex));
}

export const initialData = generateMessages(20);
