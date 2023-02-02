import { IBreadcrumbs } from '@contracts/navigation';
import { Anchor, Breadcrumbs, Popover, Text } from '@mantine/core';

import Link from 'next/link';
import Router from 'next/router';

function HeadingTop({
  text = '',
  items = [],
  listPayroll = false,
  exportPayroll = () => {},
}: {
  items: IBreadcrumbs[];
  text?: string;
  listPayroll?: boolean;
  exportPayroll?: any;
}) {
  return (
    <div className=" mb-0 px-6 pt-6 pb-2 flex flex-row justify-between bg-[#2c2c2c0d]">
      <div className="">
        <Breadcrumbs separator=">">
          {items.map((item, index) => (
            <Link href={item.href ? item.href : '/'} passHref key={index}>
              <Anchor
                className="whitespace-nowrap max-w-[100px] md:max-w-60 overflow-hidden text-ellipsis"
                style={{ color: index === 0 ? '#828282' : '#2C2C2C' }}
              >
                {item.title}
              </Anchor>
            </Link>
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
      {listPayroll && (
        <div className="flex items-center">
          <div
            className="cursor-pointer bg-black flex items-center h-[36px] w-[120px] px-6 mr-4 rounded"
            style={{
              display: 'flex',
              flex: 1,
            }}
          >
            <Popover withArrow>
              <Popover.Target>
                <Text className="text-white" weight={600} size={14}>
                  Export
                </Text>
              </Popover.Target>
              <Popover.Dropdown>
                <Text onClick={exportPayroll} size="sm" className="cursor-pointer min-w-[54px] py-1">
                  Xls
                </Text>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeadingTop;
