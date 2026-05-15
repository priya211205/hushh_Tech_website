import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Button } from "../../../components/ui/button"; // Using the standardized Button we built

const AIPoweredBerkshire = () => {
  const navigate = useNavigate();
  const GAMMA_URL = 'https://hushh-fund-a-wtv9ctn.gamma.site/';

  const handleManualRedirect = () => {
    window.open(GAMMA_URL, '_blank', 'noopener,noreferrer');
    navigate('/community');
  };

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Helmet>
        <title>The AI-Powered Berkshire Hathaway | Hushh Fund A</title>
        <meta name="description" content="Hushh Technologies Fund A Strategy – Investing in the Future of Free Cash Flow" />
      </Helmet>

      <div className="max-w-md space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          The AI-Powered Berkshire Hathaway
        </h1>
        <p className="text-gray-600">
          You are being directed to the Hushh Fund A Strategy presentation.
          Please click the button below to view the interactive deck.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={handleManualRedirect}
            className="w-full"
          >
            Open Presentation {'>'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/community')}
          >
            Back to Community
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AIPoweredBerkshire;