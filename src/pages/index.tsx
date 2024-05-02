import Date from '@frontend/components/Date';
import utilStyles from '@frontend/styles/utils.module.css';
import { Post, getSortedPosts } from '@frontend/util/posts';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { PostHogFeature, useFeatureFlagEnabled } from 'posthog-js/react';

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  const blogEnabled = useFeatureFlagEnabled('blog');

  if (!blogEnabled) {
    return (
      <div className="card">
        <h2>Come back at 12PM for the grand opening 🥳</h2>

        <pre>
          <code>
            Feature flag <strong>blog</strong> is disabled. ❌
          </code>
        </pre>
      </div>
    );
  }

  return (
    <section className={clsx(utilStyles.headingMd, utilStyles.padding1px)}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {posts &&
          posts.map(post => (
            <li className={utilStyles.listItem} key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={post.date as unknown as string} />
              </small>
            </li>
          ))}
      </ul>
      <pre>
        <code>
          Feature flag <strong>blog</strong> is enabled. ✅
        </code>
      </pre>
    </section>
  );
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const posts = getSortedPosts();
  return {
    props: {
      posts,
    },
  };
};
