import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/presentation/components/ui/card';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/presentation/components/ui/item';
import { Separator } from '@/shared/presentation/components/ui/separator';
import { groupBy } from 'lodash';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/presentation/components/ui/tabs';
import { Button } from '@/shared/presentation/components/ui/button';

interface ItemCardTab<T> {
  label: React.ReactNode;
  value: T;
}

export interface ItemCardItem<T> {
  id: string;
  media: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
  // A tab value that item belongs to
  tab: T;
}

interface ItemCardProps<T> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  tabs: Array<ItemCardTab<T>>;
  items: Array<ItemCardItem<T>>;
}

/**
 * This component renders card coponent with:
 * - Title - required
 * - Description - optional
 * - Action - Optional
 * - Tabs - required, if only one is provided, then tabs are not rendered
 * - Content that are list of items
 */
export const ItemCard = <T extends string>({ items, title, description, action, tabs }: ItemCardProps<T>) => {
  const itemsByTab = useMemo(() => groupBy(items, 'tab'), [items]);

  const visibleTabs = useMemo(() => tabs.filter((tab) => itemsByTab[tab.value]?.length), [itemsByTab, tabs]);

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription className="line-clamp-1"> {description}</CardDescription>}
        </div>
        {action}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={tabs[0].value}>
          {visibleTabs.length > 1 && (
            <TabsList className="bg-transparent h-auto justify-start overflow-x-auto gap-1 w-full no-scrollbar">
              {visibleTabs.map((tab) => (
                <TabsTrigger value={tab.value} asChild key={tab.value}>
                  <Button
                    variant={'outline'}
                    className="rounded-full! border-transparent! data-[state=active]:bg-primary/10! data-[state=active]:border-primary! data-[state=active]:text-primary!"
                  >
                    {tab.label}
                  </Button>
                </TabsTrigger>
              ))}
            </TabsList>
          )}
          {visibleTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <ItemCardItems items={itemsByTab[tab.value] ?? []} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

const ItemCardItems = <T extends string>({ items }: { items: ItemCardItem<T>[] }) => {
  return items.map((item, idx) => (
    <div key={item.id}>
      <Item>
        <ItemMedia>{item.media}</ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{item.title}</ItemTitle>
          <ItemDescription className="line-clamp-1">{item.description}</ItemDescription>
        </ItemContent>
        {item.action && <ItemActions>{item.action}</ItemActions>}
      </Item>
      {idx < items.length - 1 && <Separator />}
    </div>
  ));
};
