import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink, Shield, Search, Zap, Key, Bug, Smartphone, Wifi, Globe, Network, Users, Wrench } from 'lucide-react';
import { pentestTools, categories } from '@/data/pentestTools';

const categoryIcons = {
  Reconnaissance: Search,
  'Scan & Mapping Web': Globe,
  'Exploitation Web': Zap,
  'Exploitation Réseau': Network,
  'Password Cracking': Key,
  'Wireless & Bluetooth Hacking': Wifi,
  'Reverse Engineering': Bug,
  'Mobile Pentesting': Smartphone,
  'Social Engineering': Users,
  'Divers & Utilitaires': Wrench,
};

const licenseColors = {
  'Open-source': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Gratuit: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Commercial: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Freemium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

const toolTypeColors = {
  CLI: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  GUI: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  Framework: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Web: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  Mobile: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredTools =
    selectedCategory === 'Tous'
      ? pentestTools
      : pentestTools.filter((tool) => tool.category === selectedCategory);

  const getCategoryStats = (category: string) => {
    if (category === 'Tous') return pentestTools.length;
    return pentestTools.filter((tool) => tool.category === category).length;
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto p-6">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
              <Shield className="text-primary h-8 w-8" />
              Mémo Outils Pentest & Hacking Éthique
            </CardTitle>
            <CardDescription className="text-lg">
              Référence complète des outils essentiels pour la cybersécurité offensive
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full">
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon =
                category !== 'Tous'
                  ? categoryIcons[category as keyof typeof categoryIcons]
                  : Shield;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs lg:text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}>
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{category}</span>
                  <Badge
                    variant={selectedCategory === category ? "secondary" : "outline"}
                    className="ml-1 text-xs">
                    {getCategoryStats(category)}
                  </Badge>
                </button>
              );
            })}
          </div>

          {categories.map((category) => (
            <TabsContent
              key={category}
              value={category}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category !== 'Tous' &&
                      categoryIcons[category as keyof typeof categoryIcons] &&
                      (() => {
                        const Icon = categoryIcons[category as keyof typeof categoryIcons];
                        return <Icon className="h-5 w-5" />;
                      })()}
                    {category === 'Tous' ? 'Tous les outils' : category}
                    <Badge variant="outline">{filteredTools.length} outils</Badge>
                  </CardTitle>
                  <CardDescription>
                    {category === 'Tous'
                      ? "Vue d'ensemble de tous les outils disponibles"
                      : `Outils spécialisés en ${category.toLowerCase()}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="w-[90vw] max-w-full mx-auto overflow-hidden">
                    <Table className="w-full table-fixed border-collapse">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[12%] p-3">Nom</TableHead>
                          <TableHead className="w-[28%] p-3">Description</TableHead>
                          <TableHead className="w-[25%] p-3">Quand l'utiliser ?</TableHead>
                          <TableHead className="w-[15%] p-3">Systèmes</TableHead>
                          <TableHead className="w-[8%] p-3">Type</TableHead>
                          <TableHead className="w-[8%] p-3">Licence</TableHead>
                          <TableHead className="w-[4%] p-3">Lien</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTools.map((tool) => (
                          <TableRow key={tool.id}>
                            <TableCell className="font-semibold p-3 align-top">
                              <div className="break-words whitespace-normal text-sm leading-tight">
                                {tool.name}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm p-3 align-top">
                              <div className="break-words whitespace-normal text-sm leading-relaxed">
                                {tool.description}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm p-3 align-top">
                              <div className="break-words whitespace-normal text-sm leading-relaxed">
                                {tool.whenToUse}
                              </div>
                            </TableCell>
                            <TableCell className="p-3 align-top">
                              <div className="flex flex-wrap gap-1">
                                {tool.supportedSystems.map((system) => (
                                  <Badge
                                    key={system}
                                    variant="secondary"
                                    className="text-xs whitespace-nowrap">
                                    {system}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="p-3 align-top">
                              <Badge className={`${toolTypeColors[tool.toolType]} text-xs`}>
                                <span className="break-words whitespace-normal">{tool.toolType}</span>
                              </Badge>
                            </TableCell>
                            <TableCell className="p-3 align-top">
                              <Badge className={`${licenseColors[tool.license]} text-xs`}>
                                <span className="break-words whitespace-normal">{tool.license}</span>
                              </Badge>
                            </TableCell>
                            <TableCell className="p-3 align-top">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openLink(tool.officialLink)}
                                className="h-8 w-8 p-0 flex-shrink-0">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Ouvrir le lien officiel</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default App;
