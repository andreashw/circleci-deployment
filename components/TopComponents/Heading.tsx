import { IBreadcrumbs } from '@contracts/navigation';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';
import Router from 'next/router';

function HeadingTop({ text = '', items = [] }: { items: IBreadcrumbs[]; text?: string }) {
  return (
    <>
      <div className=" mb-0 px-6 pt-6 pb-2 bg-[#2c2c2c0d]">
        <Breadcrumbs separator=">">
          {items.map((item, index) => (
            <Anchor style={{ color: index === 0 ? '#828282' : '#2C2C2C' }} href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
        {text && (
          <div className="flex-row flex pt-2">
            <div className="pr-5 cursor-pointer" onClick={() => Router.back()}>
              {'<'}
            </div>
            <Text align="left" weight="bold" mb="xs" size="xl">
              {text}
            </Text>
          </div>
        )}
      </div>
    </>
  );
}

export default HeadingTop;
