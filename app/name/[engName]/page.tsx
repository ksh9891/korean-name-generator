import { notFound } from 'next/navigation';
import namesData from '@/data/names.json';
import NameCard from '@/components/NameCard';
import { Metadata } from 'next';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { engName } = await params;
  const nameEntry = namesData.find(
    (n) => n.engName.toLowerCase() === engName.toLowerCase()
  );

  if (!nameEntry) {
    return {
      title: 'Name Not Found',
    };
  }

  return {
    title: `${nameEntry.engName} in Korean - Korean Name Generator`,
    description: `Find out what ${nameEntry.engName} means in Korean. Your Korean name is ${nameEntry.korName}.`,
  };
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
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <NameCard nameEntry={nameEntry} />
    </div>
  );
}
