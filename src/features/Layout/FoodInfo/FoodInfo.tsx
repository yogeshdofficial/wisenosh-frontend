import { Badge, Group, List, Stack, Text, ThemeIcon } from "@mantine/core";
import { FiCheck, FiX } from "react-icons/fi";
import type { FoodInfoData } from "@src/types/food";

interface FoodInfoProps {
  data: FoodInfoData;
}

export default function FoodInfo({ data }: FoodInfoProps) {
  return (
    <Stack>
      <Text ta="center" fw={700} size="xl">
        It&apos;s a {data.foodName}
      </Text>
      <Text c="orange" ta="center">
        <List>
          {data.calories.map((calorie) => (
            <List.Item key={calorie}>{calorie}</List.Item>
          ))}
        </List>
      </Text>
      <Stack>
        <Text size="lg" fw={700} td="underline">
          Nutrients
        </Text>
        <Group>
          {data.nutrients.map((nutrient) => (
            <Badge color="grape" key={nutrient}>
              {nutrient}
            </Badge>
          ))}
        </Group>
      </Stack>
      <Stack>
        <Text size="lg" fw={700} td="underline">
          Benefits
        </Text>
        <List
          icon={
            <ThemeIcon variant="default" radius={24} c="teal">
              <FiCheck />
            </ThemeIcon>
          }
        >
          {data.benefits.map((benefit) => (
            <List.Item key={benefit}>{benefit}</List.Item>
          ))}
        </List>
      </Stack>
      <Stack>
        <Text size="lg" fw={700} td="underline">
          Ingredients
        </Text>
        <List
          icon={
            <ThemeIcon variant="default" radius={24} c="teal">
              <FiCheck />
            </ThemeIcon>
          }
        >
          {data.ingredients.map((ingredient) => (
            <List.Item key={ingredient}>{ingredient}</List.Item>
          ))}
        </List>
      </Stack>
      <Stack>
        <Text size="lg" fw={700} td="underline">
          Items Included
        </Text>
        <List
          icon={
            <ThemeIcon variant="default" radius={24} c="teal">
              <FiCheck />
            </ThemeIcon>
          }
        >
          {data.foodItemsIncluded.map((item) => (
            <List.Item key={item}>{item}</List.Item>
          ))}
        </List>
      </Stack>
      <Stack>
        <Text size="lg" fw={700} td="underline">
          Allergies
        </Text>
        <List
          icon={
            <ThemeIcon variant="default" radius={24} c="red">
              <FiX />
            </ThemeIcon>
          }
        >
          {data.allergies.map((allergy) => (
            <List.Item key={allergy}>{allergy}</List.Item>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
