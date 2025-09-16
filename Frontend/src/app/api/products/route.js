import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Call the backend API to fetch products
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products from backend');
    }

    const products = await response.json();
    
    // Transform products to include full image URLs
    const productsWithImages = products.map(product => ({
      ...product,
      image: product.image ? `${backendUrl}/${product.image.replace(/\\/g, '/')}` : null
    }));
    
    return NextResponse.json(productsWithImages);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
