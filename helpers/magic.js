import { Magic } from "magic-sdk";

const createMagic = () => {
  if (typeof window !== "undefined")
    return new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);
};

const magic = createMagic();

export default magic;
