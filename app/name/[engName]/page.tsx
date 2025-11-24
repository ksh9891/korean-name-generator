import { notFound } from 'next/navigation';
import namesData from '@/data/names.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define the shape of a name entry
interface NameEntry {
  engName: string;
  korName: string;
  meaning: string;
  tags: string[];
}

// Generate static params for all names in the data
export async function generateStaticParams() {
  return namesData.map((name) => ({
    engName: name.engName.toLowerCase(),
  }));
}

interface PageProps {
  params: Promise<{ engName: string }>;
}

export default async function Page({ params }: PageProps) {
  const { engName } = await params;
  
  // Find the name entry (case-insensitive)
  const nameEntry = namesData.find(
    (n) => n.engName.toLowerCase() === engName.toLowerCase()
  );

  if (!nameEntry) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            {nameEntry.korName}
          </CardTitle>
          <CardDescription className="text-xl text-muted-foreground mt-2">
            {nameEntry.engName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Meaning
            </h3>
            <p className="text-lg font-medium mt-1 text-gray-900">
              {nameEntry.meaning}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {nameEntry.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
