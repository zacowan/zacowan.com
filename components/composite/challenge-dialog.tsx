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
} from "@/components/ui/dialog";
import { HackedText } from "@/components/hacked-text";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CHALLENGE_SOLUTION } from "@/lib/constants";

const caesarShift = (str: string, amount: number): string => {
  if (amount < 0) {
    return caesarShift(str, amount + 26);
  }
  let output = "";
  for (let i = 0; i < str.length; i++) {
    let c = str[i]!;
    if (c.match(/[a-z]/i)) {
      const code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }
    output += c;
  }
  return output;
};

export function ChallengeDialog() {
  const [solution, setSolution] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`/api/challenge?answer=${solution}`);
    const text = await response.text();
    setMessage(text);
  };

  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        <HackedText>Investigate</HackedText>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>A Secret in Hiding</DialogTitle>
            <DialogDescription>Solve the code for a gift.</DialogDescription>
          </DialogHeader>
          <div>
            <div>
              <Label htmlFor="challenge-code">Code</Label>
              <Input
                id="challenge-code"
                value={caesarShift(CHALLENGE_SOLUTION, 23)}
                readOnly
              />
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm">Hint 1</AccordionTrigger>
                <AccordionContent>
                  <p>What might be Caesar&apos;s least-favorite number?</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm">Hint 2</AccordionTrigger>
                <AccordionContent>
                  <p>
                    The shift key on your keyboard is quite useful, isn&apos;t
                    it?
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="challenge-solution">Your Solution</Label>
              <Textarea
                id="challenge-solution"
                placeholder="Enter your solution here."
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
