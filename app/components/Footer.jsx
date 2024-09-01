import Link from 'next/link';

const Footer = () => {
  return (
    <div className='w-full h-20 mb-3 bg-gray-100 text-gray-300 flex items-center justify-center gap-4 bottom-0'>
      <p className='text-sm '>
        All right reserved{' '}
        <Link
          className='text-amazon_yellow hover:underline decoration-[1px]'
          href='https://rudynurafif.com'
          target='_blank'
        >
          @rudynurafif
        </Link>
      </p>
    </div>
  );
};

export default Footer;
