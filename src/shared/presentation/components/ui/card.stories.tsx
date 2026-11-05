import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

const meta = {
  title: 'UI/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is the card content area. You can put any content here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">New message from John</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">Team meeting at 3 PM</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <Card className="w-96 cursor-pointer transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Blog Post Title</CardTitle>
            <CardDescription>Published on Dec 4, 2024</CardDescription>
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">New</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is a preview of the blog post content. Click to read more about this interesting topic...</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full bg-gradient-to-br from-green-500 to-blue-500" />
          <span className="text-sm text-muted-foreground">John Smith</span>
        </div>
        <span className="text-sm text-muted-foreground">5 min read</span>
      </CardFooter>
    </Card>
  ),
};
