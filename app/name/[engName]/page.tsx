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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden transform transition-all hover:scale-105 duration-300">
        <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-400" />
        <CardHeader className="text-center pt-8 pb-2">
          <CardTitle className="text-4xl font-black text-gray-800 tracking-tight">
            {nameEntry.korName}
          </CardTitle>
          <CardDescription className="text-xl font-medium text-gray-500 mt-2">
            {nameEntry.engName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pb-10 px-8">
          <div className="text-center space-y-2">
            <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest">
              Meaning
            </h3>
            <p className="text-xl font-medium text-gray-700 leading-relaxed">
              &quot;{nameEntry.meaning}&quot;
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {nameEntry.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-4 py-1.5 text-sm font-semibold bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors rounded-full"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
