import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading } from "@medusajs/ui";
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types";

// The widget
const MetadataWidget = ({ data }: DetailWidgetProps<AdminOrder>) => {
  console.log("Widget data:", data);
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">LineItem Metadata</Heading>
      </div>
      <div className="px-6 py-4">
        {data.items?.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="mb-2">{item.title}</div>
            {item.metadata && Object.keys(item.metadata).length > 0 ? (
              <ul className="list-disc pl-5">
                {Object.keys(item.metadata).map((key) => {
                  const metaValue = item.metadata?.[key] as
                    | { displayName?: string; value?: any }
                    | undefined;
                  return (
                    <li key={key} className="mb-1">
                      <strong>{metaValue?.displayName}:</strong>{" "}
                      {metaValue?.value}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No metadata available</p>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "order.details.side.after",
});

export default MetadataWidget;
