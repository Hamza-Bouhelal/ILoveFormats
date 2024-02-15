import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useAuthentificatedPage } from "../../Common/Hooks/useIsAuthentificated";
import { IApiKey, useGetApiKeys } from "./hooks/useGetApiKeys";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CreateApiKeyModal } from "./components/CreateApiKeyModal";
import { DeleteApiKeyModal } from "./components/DeleteApiKeyModal";

const formatDate = (date: string) => {
  return date.split("T")[0].split("-").reverse().join("/");
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "key",
    label: "Key",
  },
  {
    key: "created_at",
    label: "Created At",
  },
  {
    key: "expired_at",
    label: "Expired At",
  },
  {
    key: "usage_count",
    label: "Usage Count",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const ApiKey = () => {
  useAuthentificatedPage();
  const { data, error, isLoading } = useGetApiKeys();
  const [newKeys, setNewKeys] = useState<IApiKey[]>([]);
  const [removedKeysIds, setRemovedKeysIds] = useState<string[]>([]);
  const allKeys = [...(data || []), ...newKeys].filter(
    (key) => !removedKeysIds.includes(key.id)
  );

  const addKey = (key: IApiKey) => {
    setNewKeys((prev) => [{ ...key, isNew: true }, ...prev]);
  };

  const removeKey = (id: string) => {
    setRemovedKeysIds((prev) => [...prev, id]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="px-36 pt-12">
      <CreateApiKeyModal onAddKey={addKey} />
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={allKeys.map(({ expired_at, created_at, ...rest }) => ({
            ...rest,
            expired_at: formatDate(expired_at),
            created_at: formatDate(created_at),
          }))}
          emptyContent={
            isLoading ? (
              <Spinner size="md" />
            ) : (
              error || "You don't have any API keys yet. Create one now!"
            )
          }
        >
          {(item) => (
            <TableRow
              key={item.key}
              className={item.isNew ? "bg-primary/10" : ""}
            >
              {(columnKey) =>
                columnKey === "actions" ? (
                  <TableCell>
                    <Button
                      variant="faded"
                      size="sm"
                      className="mr-4"
                      onPress={() => copyToClipboard(item.key)}
                    >
                      Copy
                    </Button>
                    <DeleteApiKeyModal
                      id={item.id}
                      name={item.name}
                      onDelete={() => removeKey(item.id)}
                    />
                  </TableCell>
                ) : (
                  <TableCell>
                    {columnKey === "key" && !item.isNew
                      ? getKeyValue(item, columnKey).slice(0, 5) +
                        "-".repeat(25) +
                        getKeyValue(item, columnKey).slice(-5)
                      : getKeyValue(item, columnKey)}
                  </TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
