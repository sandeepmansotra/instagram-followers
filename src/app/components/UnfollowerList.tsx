import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";

type Props = {
  extractedFiles: any[];
};

export default function UnfollowerList({ extractedFiles }: Props) {
  const followers = extractedFiles.find(
    (file) => file?.name === "followers_1.json"
  )?.content;

  const followings = extractedFiles.find(
    (file) => file?.name === "following.json"
  )?.content?.relationships_following;

  type InstagramUser = {
    href: string;
    value: string;
    timestamp: number;
  };

  type InstagramList = {
    title: string;
    media_list_data: any[];
    string_list_data: InstagramUser[];
  }[];

  function findNonFollowers(
    followersList: InstagramList,
    followingList: InstagramList
  ): { value: string; href: string }[] {
    const followersSet = new Set(
      followersList.flatMap((list) =>
        list.string_list_data.map((user) => user.value)
      )
    );

    return followingList
      .flatMap((list) => list.string_list_data)
      .filter((user) => !followersSet.has(user.value))
      .map((user) => ({ value: user.value, href: user.href }));
  }

  const usersList = findNonFollowers(followers, followings);

  console.log({ usersList });

  return (
    <div>
      <div className="mx-auto max-w-4xl -mt-10 text-center">
        <h2 className="text-xl font-semibold text-purple-600">Instagram</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white-900 sm:text-6xl">
          People don’t follow you back
        </p>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-900 bg-gray-900 mt-10 px-6 rounded-xl"
      >
        {usersList.map((person) => (
          <li
            key={person.value}
            className="flex justify-between items-center gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <Avatar name={person?.value} />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-100">
                  {person?.value}
                </p>
                <a
                  href={person?.href}
                  className="mt-1 truncate underline text-xs/5 text-purple-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {person?.href}
                </a>
              </div>
            </div>
            <div
              onClick={() => navigator.clipboard.writeText(person?.value)}
              className="shrink-0 focus:opacity-10 cursor-pointer sm:flex sm:flex-col sm:items-end"
            >
              <Image
                aria-hidden
                src="/copy.svg"
                alt="copy"
                width={20}
                height={20}
                className="dark:invert"
              />
              <span className="sr-only">Copy username</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
