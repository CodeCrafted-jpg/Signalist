export const dynamic = 'force-dynamic';

import { Star } from 'lucide-react';
import { searchStocks } from '@/lib/actions/finnhub.action';
import { getWatchlistWithData } from '@/lib/actions/watchlist.action';
import SearchCommand from '@/components/SearchCommand';
import { WatchlistTable } from '@/components/WatchlistTable';

const Watchlist = async () => {
  const watchlist = await getWatchlistWithData();
  const initialStocks = await searchStocks();

  const isEmpty = !watchlist || watchlist.length === 0;

  return (
    <section className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8  text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl text-white sm:text-3xl font-semibold tracking-tight">Your Watchlist</h1>
        <SearchCommand initialStocks={initialStocks} />
      </div>

      {/* Empty state */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-gray-50 rounded-2xl shadow-sm">
          <Star className="w-12 h-12 text-emerald-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
          <p className="max-w-sm text-gray-600 mb-6">
            Start building your watchlist by searching for stocks and clicking the star icon to add them.
          </p>
          <div className="w-full sm:w-auto">
            <SearchCommand initialStocks={initialStocks} />
          </div>
        </div>
      ) : (
        <div className=" p-4 sm:p-6 rounded-2xl shadow-sm overflow-x-auto">
          <WatchlistTable watchlist={watchlist} />
        </div>
      )}
    </section>
  );
};

export default Watchlist;
