import React, { useCallback } from 'react';
import styles from './styles.module.css';

const AUTHORS = {
  hyunjin: {
    name: 'hyunjin',
    title: 'FrontEnd Engineer',
    url: 'https://github.com/hyunjinee',
    image_url: 'https://github.com/hyunjinee.png',
  },
} as const;

type TAuthor = keyof typeof AUTHORS;

interface IAuthors {
  bookLeader: TAuthor;
  authors?: TAuthor[];
}

export default function Authors({
  bookLeader,
  authors,
}: IAuthors): JSX.Element {
  const Author = ({ author }: { author: TAuthor }): JSX.Element => {
    const authorInfo = AUTHORS[author];

    return (
      <div className={styles.author}>
        <a
          href={authorInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.avatar__link}
        >
          <img
            src={authorInfo.image_url}
            alt={author}
            className={styles.avatar__photo}
          />
        </a>
        <div className={styles.avatar__info}>
          <span className={styles.bold}>
            {authorInfo.name} {author === bookLeader && ` 🏆`}
          </span>
          <span>{authorInfo.title}</span>
        </div>
      </div>
    );
  };

  const renderAuthors = useCallback((): JSX.Element => {
    return (
      <div className={styles.authors}>
        {AUTHORS[bookLeader] && <Author author={bookLeader} />}
        {authors &&
          authors.map((author) => {
            if (AUTHORS[author]) {
              return <Author author={author} key={author} />;
            }
          })}
      </div>
    );
  }, [bookLeader, authors]);

  return (
    <section>
      <span className={styles.title}>written by</span>
      {renderAuthors()}
    </section>
  );
}
