import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { marketApi } from "@/lib/api";
import type { MarketPriceRequest } from "@shared/schema";

const crops = [
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "sugarcane", label: "Sugarcane" },
  { value: "cotton", label: "Cotton" }
];

const states = [
  { value: "punjab", label: "Punjab" },
  { value: "uttar pradesh", label: "Uttar Pradesh" },
  { value: "west bengal", label: "West Bengal" },
  { value: "haryana", label: "Haryana" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "gujarat", label: "Gujarat" },
  { value: "andhra pradesh", label: "Andhra Pradesh" }
];

export default function Market() {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data: priceData, isLoading, error } = useQuery({
    queryKey: ["/api/market-prices", selectedCrop, selectedState],
    queryFn: () => marketApi.getPrices({ crop: selectedCrop, state: selectedState }),
    enabled: shouldFetch && selectedCrop !== "" && selectedState !== "",
  });

  const handleSearch = () => {
    if (selectedCrop && selectedState) {
      setShouldFetch(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--agri-green-50)] to-green-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Market Prices</h1>
          <p className="text-xl text-gray-600">
            Get real-time mandi prices across different states
          </p>
        </div>

        {/* Search Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="text-[var(--price-amber)]" size={24} />
              <span>Price Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Crop
                </label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select State
                </label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={!selectedCrop || !selectedState || isLoading}
                  className="w-full bg-[var(--price-amber)] hover:bg-[var(--price-amber)]/90 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Get Prices"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {error && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle size={20} />
                <span>Failed to fetch price data. Please try again.</span>
              </div>
            </CardContent>
          </Card>
        )}

        {priceData && (
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">
                {selectedCrop} Prices in {selectedState}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {priceData.prices.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mandi</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {priceData.prices.map((price, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{price.mandi}</TableCell>
                          <TableCell className="text-[var(--price-amber)] font-bold">
                            ₹{price.price.toLocaleString()}
                            {/* Price indicator */}
                            {price.price > 2400 && (
                              <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                High
                              </span>
                            )}
                            {price.price >= 2000 && price.price <= 2400 && (
                              <span className="ml-2 text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                                Moderate
                              </span>
                            )}
                            {price.price < 2000 && (
                              <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                Low
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{price.unit}</TableCell>
                          <TableCell>{price.date || "Today"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Price Data Available</h3>
                  <p className="text-gray-600">{priceData.message}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Market Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Available Crops</h3>
              <p className="text-2xl font-bold text-[var(--agri-primary)]">{crops.length}</p>
              <p className="text-sm text-gray-600">Major crops tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">States Covered</h3>
              <p className="text-2xl font-bold text-[var(--price-amber)]">{states.length}</p>
              <p className="text-sm text-gray-600">Agricultural states</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Data Freshness</h3>
              <p className="text-2xl font-bold text-[var(--weather-blue)]">Live</p>
              <p className="text-sm text-gray-600">Real-time updates</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
