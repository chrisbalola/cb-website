import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size of the spinner',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the spinner',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Loading...',
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    label: 'Loading...',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Loading...',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  args: {
    label: 'Loading...',
  },
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner label="Loading..." size="sm" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner label="Loading..." size="default" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner label="Loading..." size="lg" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  args: {
    label: 'Loading...',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Spinner label="Loading..." size="sm" />
        <span className="text-sm">Loading data...</span>
      </div>
      <div className="flex items-center gap-3">
        <Spinner label="Loading..." size="default" />
        <span>Processing request...</span>
      </div>
      <div className="flex items-center gap-3">
        <Spinner label="Loading..." size="lg" />
        <span className="text-lg">Please wait...</span>
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  args: {
    label: 'Loading...',
  },
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner label="Loading..." className="text-primary" />
        <span className="text-xs text-muted-foreground">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner label="Loading..." className="text-destructive" />
        <span className="text-xs text-muted-foreground">Destructive</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner label="Loading..." className="text-green-500" />
        <span className="text-xs text-muted-foreground">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner label="Loading..." className="text-yellow-500" />
        <span className="text-xs text-muted-foreground">Warning</span>
      </div>
    </div>
  ),
};

export const InButton: Story = {
  args: {
    label: 'Loading...',
  },
  render: () => (
    <div className="flex gap-4">
      <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground" disabled>
        <Spinner label="Loading..." size="sm" />
        Loading...
      </button>
      <button className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 shadow-sm" disabled>
        <Spinner label="Processing..." size="sm" className="text-primary" />
        Processing
      </button>
    </div>
  ),
};

export const CenteredInCard: Story = {
  args: {
    label: 'Loading content...',
  },
  render: () => (
    <div className="flex w-96 flex-col items-center justify-center rounded-lg border bg-card p-12 shadow-sm">
      <Spinner label="Loading content..." size="lg" className="text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">Loading content...</p>
    </div>
  ),
};
