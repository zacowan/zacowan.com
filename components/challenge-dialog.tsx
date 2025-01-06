"use client";

import { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogFooter,
} from "@/components/ui/dialog";
import { HackedText } from "@/components/ui/hacked-text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CHALLENGE_INPUT } from "@/lib/challenge-input";

export function ChallengeDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [solution, setSolution] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading) return;
    setMessage("");
    setIsLoading(true);
    try {
      const response = await fetch(`/api/challenge?answer=${solution}`);
      const text = await response.text();
      if (response.status === 200) {
        setIsSolutionCorrect(true);
      } else {
        setIsSolutionCorrect(false);
      }
      setMessage(text);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="underline">
        <HackedText forceUnhack={isDialogOpen || isSolutionCorrect}>
          {isSolutionCorrect ? "View Solved Challenge" : "Investigate"}
        </HackedText>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isSolutionCorrect
                ? "You Solved the Challenge!"
                : "A Secret in Hiding"}
            </DialogTitle>
            <DialogDescription>
              {isSolutionCorrect
                ? "Excellent work! Use the link below to view your gift."
                : "Decode the challenge input and receive a surprise gift."}
            </DialogDescription>
          </DialogHeader>
          {isSolutionCorrect ? (
            <DialogFooter>
              <Button asChild>
                <a
                  href="https://youtu.be/oHg5SJYRHA0?si=uygtnUWCYdEIKKMN"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Gift
                </a>
              </Button>
            </DialogFooter>
          ) : (
            <>
              <div>
                <div>
                  <Label htmlFor="challenge-input">Challenge Input</Label>
                  <Input
                    id="challenge-input"
                    value={CHALLENGE_INPUT}
                    readOnly
                  />
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">
                      Hint 1
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        What might <b>Caesar&apos;s</b> least-favorite number
                        be?
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">
                      Hint 2
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        The <b>shift</b> key on your keyboard is quite useful,
                        isn&apos;t it?
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="challenge-solution">Your Solution</Label>
                  <Input
                    id="challenge-solution"
                    placeholder="Enter your solution here."
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                  />
                </div>
                <div className="w-full flex justify-end">
                  <Button type="submit" disabled={isLoading ? true : undefined}>
                    Submit
                  </Button>
                </div>
              </form>
              {error ? (
                <div>
                  <p>An unexpected error occurred. Please try again.</p>
                  <p>Error message: {error.message}</p>
                </div>
              ) : (
                isSolutionCorrect === false && message && <p>{message}</p>
              )}
            </>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
