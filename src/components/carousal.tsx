"use client"
import React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Mail } from "lucide-react"

export default function Carousal(carouselItem: any) {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
            className="relative w-full max-w-lg md:max-w-xl"
        >
            <CarouselContent>
                {carouselItem?.items?.map((message: any, index: number) => (
                    <CarouselItem key={index} className="p-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{message.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                                <Mail className="flex-shrink-0" />
                                <div>
                                    <p>{message.content}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {message.received}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
