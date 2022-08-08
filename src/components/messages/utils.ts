import { faker } from "@faker-js/faker";

faker.seed(123);
export interface Message {
  id: number | string;
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
    id: faker.git.commitSha(),
    bgColor: toggleBg(index),
    title: faker.animal.dog(),
    body: index % 2 ? faker.lorem.lines(10) : faker.lorem.sentence(),
    image: index % 3 > 0 ? faker.image.food(640, 480, true) : undefined,
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
