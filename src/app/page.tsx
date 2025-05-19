'use client';

import { useChat } from '@ai-sdk/react';
import { FaUserCircle } from 'react-icons/fa';
import { GiArtificialHive } from 'react-icons/gi';
import { type UIMessage, type TextPart } from 'ai';
import cx from 'clsx';

export default function Home() {
  const { messages, input, handleSubmit, handleInputChange, status } = useChat();
  return (
    <main className='fixed h-full w-full flex justify-center items-center'>
      <div className='container h-full w-full flex flex-col py-8'>
        <div className='flex justify-center items-center text-2xl font-semibold'>
          <h2 className='text-center'>W czym mogę pomóc?</h2>
        </div>
        {messages.length > 0 ? (
          <div className='flex-1 overflow-y-auto m-2'>
            {messages.map((message: UIMessage) => (
              <div key={message.id}>
                <div className='mt-2'>
                  {message.parts.map((part: unknown, index: number) => {
                    switch ((part as TextPart).type) {
                      case 'text':
                        return (
                          <div
                            className={cx(
                              'flex flex-row',
                              message.role === 'user' &&
                                'pl-3 pr-4 py-2 rounded-3xl bg-neutral-100 w-fit'
                            )}
                            key={index}
                          >
                            <span className='pr-2 flex items-center'>
                              <strong>
                                {message.role === 'user' ? (
                                  <FaUserCircle />
                                ) : (
                                  <GiArtificialHive />
                                )}
                              </strong>
                            </span>
                            <span className='text-justify'>
                              {(part as TextPart).text}
                            </span>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <form
          onSubmit={handleSubmit}
          className='mt-4 relative mx-auto w-3/4'
        >
          <input
            value={input}
            placeholder='Zapytaj o cokolwiek'
            onChange={handleInputChange}
            disabled={status !== 'ready'}
            className={cx(
              'px-4 py-3 border border-neutral-300 rounded-3xl w-full text-lg shadow-md'
            )}
          />
        </form>
      </div>
    </main>
  );
}
