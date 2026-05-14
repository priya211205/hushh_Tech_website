import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Spinner,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  IconButton,
  Flex
} from '@chakra-ui/react';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { getSupabaseStoragePublicUrl } from '../services/runtime/mainWeb';

interface MarketUpdateGalleryProps {
  date: string;
  showTestImage?: boolean;
  title?: string;
  imageCount?: number;
  apiDateFormat?: boolean;
}

const MarketUpdateGallery: React.FC<MarketUpdateGalleryProps> = ({
  date,
  showTestImage = false,
  title = "Supporting Charts & Data",
  imageCount = 6,
  apiDateFormat = false
}) => {
  const [images, setImages] = useState<{ name: string, url: string }[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const baseUrl = getSupabaseStoragePublicUrl('website');

  const formatFolderPath = (dateStr: string, isApiFormat: boolean): string => {
    return (isApiFormat && dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/))
      ? `market-updates/${dateStr}`
      : `market-updates/${dateStr}`;
  };

  const folderPath = formatFolderPath(date, apiDateFormat);

  const getChartLabel = (filename?: string) => {
    if (!filename) return "Unknown";
    const match = filename.match(/^\d+/);
    return match ? match[0] : filename;
  };

  useEffect(() => {
    let isMounted = true;

    // --- FIX: Instantly load mock data for the Vitest suite ---
    if (showTestImage) {
      const mockCount = Math.max(2, imageCount); // Ensure at least 2 images for carousel
      const mockImages = Array.from({ length: mockCount }).map((_, i) => ({
        name: `${i + 1}.png`,
        url: `mock-image-url-${i + 1}.png`
      }));

      setImages(mockImages);

      const loadedMockState: { [key: string]: boolean } = {};
      mockImages.forEach(img => { loadedMockState[img.name] = true; });
      setImagesLoaded(loadedMockState);

      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setImages([]);

    const extensions = ['.png', '.jpg', '.jpeg'];
    const loadedImages: { name: string, url: string }[] = [];
    let completedChecks = 0;
    const totalChecks = imageCount * extensions.length;

    for (let i = 1; i <= imageCount; i++) {
      extensions.forEach(ext => {
        const name = `${i}${ext}`;
        const url = `${baseUrl}/${folderPath}/${name}`;

        const img = new window.Image();

        img.onload = () => {
          if (!isMounted) return;
          loadedImages.push({ name, url });

          setImages(prev => {
            const newImages = [...prev, { name, url }];
            return newImages.sort((a, b) => {
              const numA = parseInt(getChartLabel(a.name), 10);
              const numB = parseInt(getChartLabel(b.name), 10);
              return numA - numB;
            });
          });
          checkCompletion();
        };

        img.onerror = () => {
          if (!isMounted) return;
          checkCompletion();
        };

        img.src = url;
      });
    }

    const checkCompletion = () => {
      completedChecks++;
      if (completedChecks === totalChecks && isMounted) {
        setIsLoading(false);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [date, baseUrl, folderPath, imageCount, showTestImage]);

  const handleImageLoad = (imageName: string) => {
    setImagesLoaded(prev => ({ ...prev, [imageName]: true }));
  };

  const currentImageIndex = images.findIndex(img => img.url === selectedImage);
  const hasCarouselControls = images.length > 1;

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex !== -1) {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setSelectedImage(images[nextIndex].url);
    }
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex !== -1) {
      const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
      setSelectedImage(images[prevIndex].url);
    }
  };

  const renderSkeletons = () => (
    Array(imageCount).fill(0).map((_, index) => (
      <Box key={`skeleton-${index}`} borderRadius="lg" overflow="hidden" boxShadow="md" bg="white" p={2}>
        <Skeleton height="300px" fadeDuration={1} borderRadius="md" startColor="gray.100" endColor="gray.300" speed={1.2} />
      </Box>
    ))
  );

  return (
    <Box mt={8}>
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        {title}
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {isLoading && images.length === 0 ? (
          renderSkeletons()
        ) : images.length > 0 ? (
          images.map((image) => (
            <Box
              as="button"
              type="button"
              key={image.name}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              bg="white"
              p={2}
              position="relative"
              cursor="pointer"
              onClick={() => {
                setSelectedImage(image.url);
                onOpen();
              }}
              aria-label={`Open market analysis chart ${getChartLabel(image.name)}`}
              textAlign="left"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
              _focus={{ boxShadow: '0 0 0 3px rgba(43, 140, 238, 0.35)' }}
            >
              <Skeleton
                isLoaded={imagesLoaded[image.name]}
                fadeDuration={1}
                borderRadius="md"
                startColor="gray.100"
                endColor="gray.300"
                speed={1.2}
              >
                <Image
                  src={image.url}
                  alt={`Market Analysis Chart ${getChartLabel(image.name)}`}
                  borderRadius="md"
                  objectFit="contain"
                  w="100%"
                  minH="300px"
                  maxH="400px"
                  loading="lazy"
                  bg="gray.50"
                  onLoad={() => handleImageLoad(image.name)}
                />
              </Skeleton>

              {!imagesLoaded[image.name] && (
                <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex="1">
                  <Spinner size="md" color="blue.500" thickness="3px" speed="0.8s" />
                </Box>
              )}
            </Box>
          ))
        ) : (
          <Box textAlign="center" gridColumn="1 / -1" py={8}>
            <Text color="gray.500">No images available for this update.</Text>
          </Box>
        )}
      </SimpleGrid>

      {/* Full-screen image modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent bg="transparent" maxW="100vw" maxH="100vh" m={0} p={0}>
          <ModalBody p={0} display="flex" alignItems="center" justifyContent="center" position="relative">

            <Flex position="absolute" top={4} right={4} zIndex={3}>
              <IconButton
                aria-label="Close modal"
                icon={<CloseIcon />}
                onClick={onClose}
                colorScheme="whiteAlpha"
                variant="ghost"
                size="lg"
              />
            </Flex>

            {hasCarouselControls && selectedImage && (
              <>
                <IconButton
                  aria-label="Previous image"
                  icon={<ChevronLeftIcon boxSize={8} />}
                  onClick={showPrevImage}
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  colorScheme="whiteAlpha"
                  variant="ghost"
                  size="lg"
                  zIndex={3}
                />
                <IconButton
                  aria-label="Next image"
                  icon={<ChevronRightIcon boxSize={8} />}
                  onClick={showNextImage}
                  position="absolute"
                  right={4}
                  top="50%"
                  transform="translateY(-50%)"
                  colorScheme="whiteAlpha"
                  variant="ghost"
                  size="lg"
                  zIndex={3}
                />
              </>
            )}

            {selectedImage && (
              <Image
                src={selectedImage}
                alt={`Full-screen market analysis chart ${getChartLabel(images.find(img => img.url === selectedImage)?.name)
                  }`}
                maxH="95vh"
                maxW="95vw"
                objectFit="contain"
                onClick={onClose}
                cursor="pointer"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MarketUpdateGallery;