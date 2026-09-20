import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/new-york-v4/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion className="max-w-md" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionPanel>
          Yes. It follows the WAI-ARIA accordion pattern.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionPanel>
          Yes, with Tailwind classes you can override through `className`.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
