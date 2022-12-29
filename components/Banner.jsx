import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full h-96">
      <Image
        src={
          "https://i.seadn.io/gae/kVVevhk9BBE5BSuIoQfkH5_5FVsPTJCR34wpVBf1ACURh9dfNaybChPgiicte10yb6SYVp5iMQNXaQrOnHXmRiiOtVxUzYJR3M1I?auto=format&w=1920"
        }
        width={100}
        height={100}
        alt="banner"
        className="w-full h-full"
      />
    </div>
  );
}
