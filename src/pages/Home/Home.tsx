import { Center, Stack, Image, Button, Text, Alert, Group } from "@mantine/core";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import FoodInfo from "@src/features/Layout/FoodInfo/FoodInfo";
import type { FoodInfoData } from "@src/types/food";

export default function Home() {
  const [imgFiles, setImgFiles] = useState<FileList | null>(null);
  const [data, setData] = useState<FoodInfoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  // We no longer early-return on error; show retry UI instead
  return (
    <Stack align="center" gap={"lg"}>
      <Text size="sm" c="dimmed">
        {backendUrl}
      </Text>
      {error && (
        <Alert color="red" title="Upload Error" w="100%">
          <Stack gap={"xs"}>
            <Text size="sm">{error}</Text>
            <Group>
              <Button
                variant="light"
                onClick={() => {
                  // Reset everything so user can try again
                  setError(null);
                  setImgFiles(null);
                  setData(null);
                }}
              >
                Back to upload
              </Button>
            </Group>
          </Stack>
        </Alert>
      )}
      {!error && (
        imgFiles ? (
          <Stack>
            <Image
              src={URL.createObjectURL(imgFiles[0])}
              onLoad={(e) => {
                const url = (e.target as HTMLImageElement).src;
                URL.revokeObjectURL(url);
              }}
            ></Image>
            <Button
              onClick={async () => {
                const formData = new FormData();
                formData.append("foodImg", imgFiles[0]);

                try {
                  setPending(true);
                  const response = await fetch(backendUrl + "/upload", {
                    method: "POST",
                    body: formData,
                  });

                  if (!response.ok) throw new Error(`Upload failed (${response.status})`);
                  const json: FoodInfoData = await response.json();
                  setData(json);
                } catch (err) {
                  setError((err as Error).message);
                } finally {
                  setPending(false);
                }
              }}
              loading={pending}
              disabled={pending}
            >
              {pending ? "Submitting..." : "Submit"}
            </Button>
            {data && <FoodInfo data={data}></FoodInfo>}
          </Stack>
        ) : (
          <Stack h={"300"} align="center" justify="center">
            <label htmlFor="img-input">
              <Center>
                <FiPlusCircle size={"150"} />
              </Center>
            </label>
            <input
              accept="image/*;capture=camera"
              type="file"
              id="img-input"
              style={{ display: "none" }}
              onChange={(e) => {
                setImgFiles(e.currentTarget.files);
              }}
            />
          </Stack>
        )
      )}
    </Stack>
  );
}
