import { Link } from 'react-router-dom';
import Banner from '../Banner';
import { Users, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FiGithub } from "react-icons/fi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Banner /> */}
      
      <div className="mt-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">GitHub Insights Explorer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Analyze GitHub repositories and user profiles to gain comprehensive insights, 
          visualize project metrics, and explore contribution statistics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center">User Analysis</CardTitle>
            <CardDescription className="text-center">
              Search for GitHub users and explore their profiles and repositories
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              View user bio, repositories, contribution activity, and more.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/s/dashboard/github/user">
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Search Users
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <GitFork className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center">Repository Analysis</CardTitle>
            <CardDescription className="text-center">
              Analyze GitHub repositories and get detailed project insights
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Explore languages, contributors, commit history, and more metrics.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/s/dashboard/github/repository">
              <Button>
                <GitFork className="mr-2 h-4 w-4" />
                Analyze Repositories
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* <div className="mt-12 text-center text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          <FiGithub className="h-4 w-4" />
          Powered by GitHub API
        </p>
      </div> */}
    </div>
  );
};

export default Index;