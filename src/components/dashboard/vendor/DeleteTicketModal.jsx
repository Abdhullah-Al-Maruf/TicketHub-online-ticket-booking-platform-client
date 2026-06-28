"use client";

import { deleteTicket } from "@/lib/action/tickets";
import { Button, Modal } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteTicketModal = ({ isDeleteOpen, setIsDeleteOpen, id }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteTicket = async () => {
        setIsDeleting(true);
        try {
            const res = await deleteTicket(id);
            
            if (res) {
                toast.success("Ticket deleted successfully");
                setIsDeleteOpen(false); 
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete ticket");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <Modal.Backdrop className="bg-black/40 dark:bg-black/60 backdrop-blur-md">
                <Modal.Container>
                    {/* Swapped static dark classes to adaptive variants matching the update modal */}
                    <Modal.Dialog className="text-slate-900 dark:text-white bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-6 rounded-2xl w-full max-w-md mx-auto">
                        <Modal.CloseTrigger className="text-slate-400 hover:text-slate-600 dark:hover:text-white" />
                        
                        <Modal.Header>
                            <Modal.Heading className="text-slate-900 dark:text-white font-bold text-lg">
                                Delete Ticket Listing
                            </Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body className="py-2">
                            <p className="text-slate-600 dark:text-slate-300 text-sm">
                                Are you sure you want to delete this ticket? This will permanently remove the listing and cannot be undone.
                            </p>
                        </Modal.Body>
                        
                        <Modal.Footer className="flex justify-end gap-3 pt-4">
                            <Button 
                                variant="light" 
                                className="text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10" 
                                onPress={() => setIsDeleteOpen(false)}
                                isDisabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button 
                                color="danger" 
                                className="font-bold text-white shadow-lg" 
                                onPress={handleDeleteTicket}
                                isLoading={isDeleting}
                            >
                                Delete Ticket
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteTicketModal;