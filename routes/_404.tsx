import { Head } from "$fresh/src/runtime/head.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>

      {/* TODO: ちゃんとしたやつ用意する */}
      <div>
        404 - Page not found
      </div>
    </>
  );
}
