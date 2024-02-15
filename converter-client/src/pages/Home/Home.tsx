import { useEffect } from "react";
import { useAuthContext } from "../../Common/Providers/AuthContext";
import { InfoBox, InfoBoxProps } from "./components/InfoBox";
import { Icons } from "../../assets/Icons";
import toast from "react-hot-toast";

const allInfoBoxes: InfoBoxProps[] = [
  {
    title: "Convert your files easily",
    description:
      "Easy Convert is a free online file conversion tool.\n" +
      "It supports over 1000 file formats.\n" +
      "It allows you to convert any file format into another compatible format in just a few seconds.\n",
    icon: <Icons.File className="ml-1" />,
  },
  {
    title: "Works Anywhere",
    description:
      "Easy Convert is an online file converter. So it works on Windows, Mac, Linux, or any mobile device. All major browsers are supported. Simply create an account and start converting files.",
    icon: <Icons.Cloud className="ml-1" />,
  },
  {
    title: "Privacy Guaranteed",
    description:
      "We know that file security and privacy are important to you. That is why we use 256-bit SSL encryption when transferring files.\n" +
      "We also delete all files from our servers after few minutes. No one has access to your files.",
    icon: <Icons.Privacy className="ml-0.5" />,
  },
];

export default function Home() {
  const { isLoading, isAuthentification } = useAuthContext();

  useEffect(() => {
    if (!isLoading && isAuthentification) {
      toast.success("You are already logged in. Redirecting to dashboard.");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  }, [isLoading, isAuthentification]);

  return (
    <>
      <div className="font-black text-5xl text-center mt-[50px] h-auto">
        Easy Convert
      </div>
      {allInfoBoxes.map((infoBox, idx) => (
        <InfoBox key={idx} {...infoBox} />
      ))}
    </>
  );
}
