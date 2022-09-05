import { IBreadcrumbs } from '@contracts/navigation';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';

function HeadingTop({ text = '', items = [] }: { items: IBreadcrumbs[]; text?: string }) {
  return (
    <>
      <div className=" mb-0 p-5 bg-[#2c2c2c0d]">
        <Breadcrumbs separator=">">
          {items.map((item, index) => (
            <Anchor
              style={{ color: index === 0 ? '#828282' : '#2C2C2C' }}
              href={item.href}
              key={index}
            >
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
        <Text align="left" weight="bold" mb="xs" size="xl">
          {text}
        </Text>
      </div>
    </>
  );
}

export default HeadingTop;
