// components/dashboard/admin/revenue/RecentTransactionsTable.jsx
"use client";

import {
  Card,
  Table,
  Chip,
} from "@heroui/react";

const StatusChip = ({ status }) => {
  const colorMap = {
    Completed: "success",
    Pending: "warning",
    Failed: "danger",
  };
  const chipColor = colorMap[status] || "default";
  return (
    <Chip size="sm" color={chipColor} variant="flat">
      {status || "Unknown"}
    </Chip>
  );
};

export default function RecentTransactionsTable({ transactions }) {
  return (
    <Card className="bg-surface border border-border rounded-2xl p-5 shadow-custom">
      <h3 className="text-on-surface font-semibold mb-4">
        Recent Revenue Transactions
      </h3>
      <div className="overflow-x-auto">
        <Table aria-label="Recent transactions">
          <Table.ScrollContainer>
            <Table.Content>
              {/* ─── Header ─────────────────────────────── */}
              <Table.Header className="bg-surface-container-low border-b border-border">
                <Table.Column
                  isRowHeader
                  className="py-3 px-4 text-on-surface-variant font-bold uppercase text-[10px] tracking-wider"
                >
                  Transaction ID
                </Table.Column>
                <Table.Column className="py-3 px-4 text-on-surface-variant font-bold uppercase text-[10px] tracking-wider">
                  Date
                </Table.Column>
                <Table.Column className="py-3 px-4 text-on-surface-variant font-bold uppercase text-[10px] tracking-wider">
                  Route
                </Table.Column>
                <Table.Column className="py-3 px-4 text-on-surface-variant font-bold uppercase text-[10px] tracking-wider">
                  Method
                </Table.Column>
                <Table.Column className="py-3 px-4 text-on-surface-variant font-bold uppercase text-[10px] tracking-wider">
                  Status
                </Table.Column>
                <Table.Column className="py-3 px-4 text-on-surface-variant font-bold uppercase text-[10px] tracking-wider text-right">
                  Amount
                </Table.Column>
              </Table.Header>

              {/* ─── Body ───────────────────────────────── */}
              <Table.Body>
                {transactions.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={6}
                      className="text-center py-8 text-on-surface-variant"
                    >
                      No transactions found
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  transactions.map((tx) => (
                    <Table.Row
                      key={tx.id}
                      className="border-b border-border hover:bg-surface-container-low transition-colors last:border-b-0"
                    >
                      <Table.Cell className="py-3 px-4 font-medium text-on-surface">
                        {tx.id}
                      </Table.Cell>
                      <Table.Cell className="py-3 px-4 text-on-surface-variant">
                        {tx.date}
                      </Table.Cell>
                      <Table.Cell className="py-3 px-4 text-on-surface-variant">
                        {tx.route}
                      </Table.Cell>
                      <Table.Cell className="py-3 px-4 text-on-surface-variant">
                        {tx.method}
                      </Table.Cell>
                      <Table.Cell className="py-3 px-4">
                        <StatusChip status={tx.status} />
                      </Table.Cell>
                      <Table.Cell className="py-3 px-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                        ${tx.amount?.toFixed(2) ?? "0.00"}
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </Card>
  );
}