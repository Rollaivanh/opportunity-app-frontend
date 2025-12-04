"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OpportunitiesTableProps {
  opportunities: any[];
  onDelete: (id: number) => void;
  onEdit: (opportunity: any) => void;
}

export default function OpportunitiesTable({
  opportunities,
  onDelete,
  onEdit,
}: OpportunitiesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Puesto</TableHead>
          <TableHead>Empresa</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {opportunities.map((op) => (
          <TableRow key={op.id}>
            {/* PUESTO */}
            <TableCell className="font-medium">{op.position}</TableCell>

            {/* EMPRESA */}
            <TableCell>
              {op.company?.name || (
                <span className="text-gray-400 italic">Sin empresa</span>
              )}
            </TableCell>

            {/* LINK */}
            <TableCell>
              {op.link ? (
                <a
                  href={op.link}
                  target="_blank"
                  className="text-blue-600 underline text-sm"
                >
                  Ver
                </a>
              ) : (
                <span className="text-gray-400 italic">—</span>
              )}
            </TableCell>

            {/* ESTADO */}
            <TableCell>
              <StatusBadge status={op.status || "SENT"} />
            </TableCell>

            {/* FECHA */}
            <TableCell className="text-gray-500 text-sm">
              {new Date(op.createdAt).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </TableCell>

            {/* ACCIONES */}
            <TableCell className="text-right flex gap-2 justify-end">
              <Button variant="secondary" size="sm" onClick={() => onEdit(op)}>
                Editar
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(op.id)}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {opportunities.length === 0 && (
        <TableCaption className="text-gray-500">
          Todavía no registraste ninguna oportunidad.
        </TableCaption>
      )}
    </Table>
  );
}
