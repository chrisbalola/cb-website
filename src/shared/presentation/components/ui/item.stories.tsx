import type { Meta, StoryObj } from '@storybook/react';
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from './item';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';

const meta: Meta<typeof Item> = {
  title: 'UI/Item',
  component: Item,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'muted'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Item>;

export const Default: Story = {
  args: {
    children: (
      <>
        <ItemMedia>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Shadcn</ItemTitle>
          <ItemDescription>Beautifully designed components that you can copy and paste into your apps.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="default" size="sm" className="rounded-full">
            Follow
          </Button>
        </ItemActions>
      </>
    ),
  },
};
