import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './theme-toggle';

const meta = {
  title: 'Misc/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button to toggle between light and dark themes. Uses zustand for state management.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">Click to toggle theme</p>
      <ThemeToggle />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <span className="text-sm font-medium">Theme:</span>
      <ThemeToggle />
    </div>
  ),
};

export const InNavbar: Story = {
  render: () => (
    <nav className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
      <div className="text-lg font-bold">Chris Balola</div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-sm hover:underline">
          Home
        </a>
        <a href="#" className="text-sm hover:underline">
          About
        </a>
        <a href="#" className="text-sm hover:underline">
          Contact
        </a>
        <ThemeToggle />
      </div>
    </nav>
  ),
};

export const MultipleToggles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-sm font-medium">Header</h3>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-sm font-medium">Sidebar</h3>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">All toggles are synchronized via zustand store</p>
    </div>
  ),
};
